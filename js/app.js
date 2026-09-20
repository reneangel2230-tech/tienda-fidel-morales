/* ==========================================================================
   Logica de la Tienda Fidel Morales
   ========================================================================== */

(function () {
  "use strict";

  function waLink(mensaje, numeroOverride) {
    var numero = numeroOverride || (window.WHATSAPP_FIDEL || "50700000000").replace(/[^0-9]/g, "");
    if (numero === "50700000000" || numero.length < 10) {
      return "#";
    }
    return "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensaje);
  }

  function textoPrecio(precio) {
    if (precio === null || typeof precio === "undefined") {
      return '<span class="precio-por-confirmar">Precio por confirmar</span>';
    }
    return '<span class="precio">$' + Number(precio).toFixed(2) + "</span>";
  }

  function textoFormato(libro, formato) {
    if (formato === "fisico") return "Formato físico";
    if (formato === "digital") return "Formato digital (PDF)";
    return "Libro";
  }

  function construirFicha(libro, indice) {
    var portada = "img/" + (libro.portada || "");
    var tarjeta = document.createElement("article");
    tarjeta.className = "libro-card";
    tarjeta.setAttribute("data-libro", libro.id || ("libro-" + indice));

    var estilosPortada = "background-image:url('" + portada + "'),linear-gradient(160deg,#2c3a55,#1c2333);";

    var capsHtml = "";
    if (libro.capitulos && libro.capitulos.length) {
      capsHtml =
        "<details class=\"libro-cap-list\"><summary>Ver capítulos (" +
        libro.capitulos.length +
        ")</summary><ul><li>" +
        libro.capitulos
          .map(function (c) {
            return "<strong>Capítulo " + c.n + ".</strong> " + c.titulo;
          })
          .join("</li><li>") +
        "</li></ul></details>";
    }

    var subtituloHtml = libro.subtitulo
      ? '<p class="libro-subtitulo">' + libro.subtitulo + "</p>"
      : "";

    var formatosHtml = (libro.formato || ["fisico"])
      .map(function (f, i) {
        var etiqueta = f === "fisico" ? "Físico" : f === "digital" ? "Digital (PDF)" : f;
        return (
          '<label title="' + textoFormato(libro, f) + '">' +
          '<input type="radio" name="formato-' + (libro.id || indice) + '" value="' + f + '"' +
          (i === 0 ? " checked" : "") + ">" +
          etiqueta +
          "</label>"
        );
      })
      .join("");

    tarjeta.innerHTML =
      '<div class="libro-portada" style="' + estilosPortada + '"></div>' +
      '<div class="libro-cuerpo">' +
      '<p class="libro-meta">' +
      [(libro.genero || ""), (libro.editorial || "Editorial La Inspiración")]
        .filter(Boolean)
        .join(" · ") +
      (libro.anio ? " · " + libro.anio : "") +
      "</p>" +
      '<h3 class="libro-titulo">' + libro.titulo + "</h3>" +
      subtituloHtml +
      '<p class="libro-resumen">' + (libro.resumen || "") + "</p>" +
      capsHtml +
      "</div>" +
      '<div class="libro-acciones">' +
      '<div class="precio-line"><span class="libro-meta">' +
      (libro.edicion || "Primera edición") +
      "</span><span class=\"precio-line-value\">" + textoPrecio(libro.precioFisico) + "</span></div>" +
      '<div class="formato-opts">' + formatosHtml + "</div>" +
      '<div class="cantidad-row"><span>Cantidad</span>' +
      '<input class="cantidad-input" type="number" min="1" max="20" value="1" inputmode="numeric"></div>' +
      '<button class="btn btn-wa btn-pedir" type="button">Pedir por WhatsApp</button>' +
      '<a class="btn btn-outline btn-pay" href="#" target="_blank" rel="noopener" style="display:none;">Pagar en línea</a>' +
      "</div>";

    var cantidadInput = tarjeta.querySelector(".cantidad-input");
    var btn = tarjeta.querySelector(".btn-pedir");

    function mensajePedido() {
      var formato = tarjeta.querySelector('input[name="formato-' + (libro.id || indice) + '"]:checked');
      var f = formato ? formato.value : "fisico";
      var cantidad = parseInt(cantidadInput.value, 10) || 1;
      var precio = f === "digital" ? libro.precioDigital : libro.precioFisico;
      var lineas = [
        'Hola, quiero pedir el libro "' + libro.titulo + '"',
        "Formato: " + textoFormato(libro, f).toLowerCase()
      ];
      if (typeof precio === "number") {
        lineas.push("Precio unitario: $" + precio.toFixed(2));
        lineas.push("Total estimado: $" + (precio * cantidad).toFixed(2));
      } else {
        lineas.push("Precio: por confirmar");
      }
      lineas.push("Cantidad: " + cantidad);
      lineas.push("¿Me confirmas disponibilidad y cómo procedo con la compra?");
      return lineas.join("\n");
    }

    btn.addEventListener("click", function () {
      var link = waLink(mensajePedido());
      if (link === "#") {
        btn.textContent = "Configurar número de WhatsApp";
        btn.disabled = true;
        return;
      }
      window.open(link, "_blank", "noopener");
    });

    if (libro.amazon) {
      var a = document.createElement("a");
      a.className = "btn btn-outline btn-amazon";
      a.target = "_blank";
      a.rel = "noopener";
      a.href = libro.amazon;
      a.innerHTML =
        '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M13.5 7c.5.4.9.3 1.4.3.6 0 1.2-.1 1.8-.3.2-.1.4 0 .3.2-.2.7-.5 1.3-.9 1.9-.3.4-.2.7.1 1 .6.7 1.2 1.5 1.8 2.2.2.3.2.5-.1.4-.7-.3-1.5-.5-2.1-1-.3-.3-.7-.3-1.1 0-.5.4-1 .8-1.5 1.2 1.3.3 2.7.6 4 .4 1.1-.2 1.2.5 0 .9-1.3.5-3.3.4-5.1-.1-.3-.1-.6-.1-.9-.2-.5-.2-1-.3-1.5-.4-.4-.1-.8.1-1.3.2-.4.1-.8.2-1.2.3-1.4.4-2.9.5-4.1 1.2-.4.2-.8-.2-.4-.6.7-.7 1.9-1.1 3-1.4.5-.1.9-.3 1.4-.5 1.4-.4 2.9-.6 4.3-1.1h.1c1.3-.4 2.6-1 3.9-1.4h.1c.8-.3 1.5-.4 2.2-.5.5-.1 1-.3 1.5-.5 1.1-.4 1.7.2.6 1.1-1 .9-2.7 1.6-4.4 1.7-1-.6-1.8-1-2.7-.9z"/></svg>' +
        "También en Amazon";
      btn.parentNode.insertBefore(a, btn.nextSibling);
    }

    var portadaDiv = tarjeta.querySelector(".libro-portada");
    if (libro.portada) {
      var probePortada = new Image();
      probePortada.onload = function () {
        portadaDiv.style.aspectRatio =
          probePortada.naturalWidth + "/" + probePortada.naturalHeight;
      };
      probePortada.src = "img/" + libro.portada;
    }

    var nombreFormato = 'formato-' + (libro.id || indice);
    var radios = tarjeta.querySelectorAll('input[name="' + nombreFormato + '"]');
    var btnPay = tarjeta.querySelector(".btn-pay");

    function actualizarPago() {
      var t = window.TIENDA || {};
      if (!btnPay) return;
      var parar = true;
      if ((t.paypal || t.yappy)) {
        var f = tarjeta.querySelector('input[name="' + nombreFormato + '"]:checked');
        var formato = f ? f.value : "fisico";
        var precio = formato === "digital" ? libro.precioDigital : libro.precioFisico;
        if (t.paypal && typeof precio === "number") {
          btnPay.href = "https://www.paypal.me/" + t.paypal + "/" + precio;
          btnPay.textContent = "Pagar con PayPal";
          parar = false;
        } else if (t.yappy) {
          var yappyS = String(t.yappy);
          if (/^https?:\/\//.test(yappyS)) {
            btnPay.href = yappyS;
            btnPay.textContent = "Pagar con Yappy";
          } else {
            var montoDesc = typeof precio === "number" ? "$" + precio.toFixed(2) : "el precio del libro";
            var msgPago =
              'Hola, quiero pagar ' + montoDesc + ' del libro "' + libro.titulo + '" (' +
              (formato === "digital" ? "digital" : "físico") +
              ") por Yappy al número " + yappyS + ". Aquí te envío el comprobante de pago.";
            btnPay.href = waLink(msgPago);
            btnPay.textContent = "Pagar por Yappy (" + yappyS + ")";
          }
          parar = false;
        }
      }
      btnPay.style.display = parar ? "none" : "";
    }

    radios.forEach(function (radio) {
      radio.addEventListener("change", actualizarPago);
    });
    actualizarPago();

    return tarjeta;
  }

  function renderLibros() {
    var contenedor = document.getElementById("listado-libros");
    if (!contenedor) return;
    var libros = window.LIBROS || [];
    libros.forEach(function (libro, i) {
      contenedor.appendChild(construirFicha(libro, i));
    });
    if (!libros.length) {
      contenedor.innerHTML = "<p>Catálogo en preparación.</p>";
    }
  }

  function configInicial() {
    var t = window.TIENDA || {};
    var autorEd = document.getElementById("autor-editorial");
    if (autorEd && t.editorial) autorEd.textContent = t.editorial;

    var logoProbe = new Image();
    logoProbe.onload = function () {
      var mark = document.querySelector(".brand-mark");
      if (mark) mark.style.display = "none";
    };
    logoProbe.src = "img/logo-editorial.jpg";

    var sello = document.getElementById("nav-editorial");
    if (sello && t.editorial) sello.textContent = t.editorial;

    var heroPortada = document.getElementById("hero-portada");
    var primerLibro = (window.LIBROS || [])[0];
    if (heroPortada && primerLibro) {
      function portadaGenerica() {
        heroPortada.classList.add("book-generic");
        heroPortada.style.backgroundImage = "";
        heroPortada.innerHTML =
          "<p>" + (primerLibro.editorial || "Editorial La Inspiración") + "</p><h4>" + primerLibro.titulo + "</h4>";
      }
      if (primerLibro.portada) {
        var probe = new Image();
        probe.onload = function () {
          heroPortada.style.backgroundImage = "url('img/" + primerLibro.portada + "')";
          heroPortada.style.aspectRatio =
            probe.naturalWidth + "/" + probe.naturalHeight;
        };
        probe.onerror = portadaGenerica;
        probe.src = "img/" + primerLibro.portada;
      } else {
        portadaGenerica();
      }
    }

    var waGeneral = "Hola, quiero información sobre los libros de Fidel Morales.";
    var navWa = document.getElementById("nav-wa");
    var waContacto = document.getElementById("wa-contacto");
    var link = waLink(waGeneral);
    if (navWa) {
      navWa.href = link;
      if (link === "#") navWa.textContent = "Configurar WhatsApp";
    }
    if (waContacto) waContacto.href = link;

    var meta = document.getElementById("footer-meta");
    if (meta) {
      meta.textContent =
        (t.autor ? t.autor + " · " : "") + new Date().getFullYear() + " · Envíos y entregas en Panamá";
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    configInicial();
    renderLibros();
  });

  // Soporte si libs se cargan despues del DOMListo
  if (document.readyState !== "loading") {
    if (!document.getElementById("listado-libros").children.length) renderLibros();
  }
})();