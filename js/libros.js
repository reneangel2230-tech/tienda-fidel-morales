/* ==========================================================================
   CONFIGURACION DE LA TIENDA - Fidel Morales D.
   --------------------------------------------------------------------------
   COMO EDITAR:
   1. WHATSAPP_FIDEL: numero con codigo de pais SIN espacios ni simbolos.
      Ej. +507 6123-4567 se escribe asi: "50761234567"
   2. Para agregar un libro nuevo, copia un bloque del arreglo LIBROS
      (de llave { ... }, hasta la siguiente llave { ) y pegalo despues
      del ultimo, separado por coma. Cambia titulo, isbn, etc.
   3. portada: nombre del archivo dentro de la carpeta img/ (ej. "libro1.jpg").
      Si el archivo no existe, se mostrara una portada generica con el titulo.
   4. precio: usa numero (12.50) o null si aun no hay precio -> mostrara
      "Precio por confirmar" y el boton de WhatsApp preguntara por el.
   ========================================================================== */

var WHATSAPP_FIDEL = "50766159319"; // Fidel Morales (+507 6615-9319)

var TIENDA = {
  nombre: "Tienda Fidel Morales",
  autor: "Fidel Morales D.",
  editorial: "Editorial La Inspiración",
  lema: "Técnicas prácticas para negociar y cerrar negocios.",
  instagram: "",      // opcional: usuario sin @, ej. "fidelmorales.autor"
  email: "",          // opcional
  /* PAGO EN LINEA:
     - paypal: tu usuario de PayPal.me sin @ (ej. "FidelMorales"). Genera el
       boton "Pagar con PayPal" con el monto exacto de cada libro.
     - yappy: opcion 2 (manual): el numero de Yappy del vendedor, ej. "6615-9319".
       El boton "Pagar por Yappy" abre WhatsApp con el mensaje de pago y el
       comprobante, para que el comprador pague en la app Yappy y te envie el recibo.
       Tambien acepta un link completo https://... (link de pago Yappy de ser el caso).
     Deja los dos vacios "" para ocultar el pago en linea. */
  paypal: "", // se activa cuando exista tu paypal.me real, ej. "ReneAngelBecerra"
  yappy: "6615-9319"
};

var LIBROS = [
  {
    id: "negociador-emprendedor",
    titulo: "Curso Práctico del Negociador Emprendedor",
    autor: "Fidel Morales D.",
    editorial: "Editorial La Inspiración",
    isbn: "978-9962-28-048-4",
    paginas: 119,
    anio: 2025,
    edicion: "1ª edición, noviembre de 2025",
    portada: "negociador-emprendedor.jpg", // reemplaza con tu imagen en img/
    amazon: "https://amzn.in/d/09k98BCO",  // Curso Práctico en Amazon (ASIN B0H1VTGWZW)
    precioFisico: 12.00,   // pon precio numeric o null = por confirmar
    precioDigital: 9.00,  // ej. 8.50
    formato: ["fisico", "digital"],
    resumen: "Un curso práctico que te formará como negociador y asesor de ventas mediante técnicas probadas de satisfacción de necesidades: aprenderás a descubrir las necesidades ocultas del cliente, a apoyarlas con beneficios de tu producto y a cerrar negocios con seguridad.",
    paraQuien: "Emprendedores, vendedores, asesores y toda persona que quiera dominar el arte de la negociación y cerrar negocios con técnica.",
    capitulos: [
      { n: "I", titulo: "Satisfacción de Necesidades" },
      { n: "II", titulo: "Apoyo" },
      { n: "III", titulo: "El Cierre de la Venta" },
      { n: "IV", titulo: "Introducción a las Actitudes" },
      { n: "V", titulo: "Cómo Tratar el E scepticismo" },
      { n: "VI", titulo: "Técnicas de Negociación mediante Satisfacción de Necesidades" },
      { n: "VII", titulo: "Presentación de Beneficios Generales" }
    ]
  },
  {
    id: "juan-vendedor",
    titulo: "Juan Vendedor",
    subtitulo: "La historia que todo emprendedor debe conocer",
    genero: "Relato inspirador",
    autor: "Fidel Morales D.",
    editorial: "Editorial La Inspiración",
    isbn: "",               // ASIN B0GGX39JZ9 (Kindle) - completa ISBN impreso si lo tienes
    paginas: 102,
    anio: 2026,
    edicion: "1ª edición, marzo de 2026",
    portada: "juan-vendedor.jpg", // reemplaza con tu imagen en img/
    amazon: "https://www.amazon.com/dp/B0GGX39JZ9",
    precioFisico: 12.00,
    precioDigital: 9.00,
    formato: ["fisico", "digital"],
    resumen: "Relato inspirador sobre la infancia y juventud de un niño que, marcado por la ausencia familiar y la pobreza, descubre en el trabajo honrado, la imaginación y la resiliencia los cimientos para construir su propio destino. Ambientado en Chalatenango en los años 70, muestra cómo Juan transforma la necesidad en ingenio: vende helados, recoge frutas, acarrea leña y se enfrenta a miedos, carencias y leyendas populares. Una historia de lucha, esperanza y valentía cotidiana.",
    paraQuien: "Emprendedores y jóvenes que buscan motivos para creer, insistir y abrirse camino aun cuando todo parece adverso."
  },
  {
    id: "emprendedor",
    titulo: "Emprendedor",
    subtitulo: "",
    genero: "Novela",
    autor: "Fidel Morales D.",
    editorial: "Editorial La Inspiración",
    isbn: "979-8243689151",
    paginas: 158,
    anio: 2026,
    edicion: "Publicado en enero de 2026",
    portada: "emprendedor.jpg",
    amazon: "https://www.amazon.com/dp/B0GKVWPBB4",
    precioFisico: 12.00,
    precioDigital: 9.00,
    formato: ["fisico", "digital"],
    resumen: "Una novela que explora el viaje interior y exterior de quien decide crear su propio destino en un mundo marcado por la incertidumbre, el riesgo y la constante reinvención. Más que una historia de negocios, es un relato humano sobre la perseverancia, el fracaso como maestro y la visión como motor de cambio: decisiones difíciles, dilemas éticos y momentos de quiebre retratan al emprendedor como un arquitecto de su propio carácter. Combina reflexión, tensión narrativa e inspiración, invitando al lector a cuestionarse qué está dispuesto a sacrificar para construir algo que realmente le pertenezca.",
    paraQuien: "Lectores de 15 años en adelante y todo quien esté creando su propio camino."
  },
  {
    id: "el-influencer",
    titulo: "El Influencer",
    subtitulo: "",
    genero: "Novela",
    autor: "Fidel Morales D.",
    editorial: "Editorial La Inspiración",
    isbn: "",               // ASIN B0GBYMK5RH - completa ISBN impreso si lo tienes
    paginas: 145,
    anio: 2025,
    edicion: "1ª edición, diciembre de 2025",
    portada: "el-influencer.jpg",
    amazon: "https://www.amazon.com/dp/B0GBYMK5RH",
    precioFisico: 12.00,
    precioDigital: 9.00,
    formato: ["fisico", "digital"],
    resumen: "La novela narra la historia de Esteban, un hombre que dedica su vida a brindar apoyo emocional y social a jóvenes en situación de vulnerabilidad a través de su proyecto humanitario Al Rescate. Ambientada en Panamá, entrelaza hechos reales, vivencias sociales contemporáneas y un enfoque testimonial desde el activismo cotidiano: visita a un padre argentino que quiere ver a su hijo en prisión, casos complejos de abuso y embarazo adolescente. Una reflexión sobre los valores esenciales —dignidad, fe, verdad, educación y propósito— en tiempos de redes sociales y consumismo.",
    paraQuien: "Quienes buscan una historia humana que conmueve e inspira a mirar más allá de lo superficial."
  },
  {
    id: "bruno",
    titulo: "Bruno",
    subtitulo: "Crimen · Pandillas · Conversión",
    genero: "Novela",
    autor: "Fidel Morales D.",
    editorial: "Editorial La Inspiración",
    isbn: "",               // ASIN B0GJ6KYZRQ - completa ISBN impreso si lo tienes
    paginas: 111,
    anio: 2026,
    edicion: "1ª edición, marzo de 2026",
    portada: "bruno.jpg",
    amazon: "https://www.amazon.com/dp/B0GJ6KYZRQ",
    precioFisico: 12.00,
    precioDigital: 9.00,
    formato: ["fisico", "digital"],
    resumen: "En un país marcado por la violencia y el crimen organizado, Bruno intenta sobrevivir en un mundo donde cada mirada es una amenaza. Bajo la apariencia de un hombre altruista, se adentra en la compleja estructura del narcotráfico internacional: reuniones secretas, pruebas de lealtad, traiciones silenciosas y operaciones que cruzan fronteras lo obligan a jugar un papel que consume su identidad. Bruno no es un héroe ni un villano: es un hombre atrapado en la maquinaria del poder oscuro, cuyo mayor desafío es mantenerse vivo y conservar su alma intacta. Una historia cruda, intensa y profundamente humana.",
    paraQuien: "Amantes del thriller y de historias humanas que revelan cómo se vive —y se muere— dentro del engranaje del crimen."
  },
  {
    id: "todo-estara-bien",
    titulo: "Todo Estará Bien",
    subtitulo: "",
    genero: "Novela",
    autor: "Fidel Morales D.",
    editorial: "Editorial La Inspiración",
    isbn: "",
    paginas: 0,
    anio: 2026,
    edicion: "",
    portada: "todo-estara-bien.jpg",
    amazon: "",  // pega aqui el link de Amazon cuando exista
    precioFisico: 12.00,
    precioDigital: 9.00,
    formato: ["fisico", "digital"],
    resumen: "Un mensaje de esperanza, fe y perseverancia: una historia que recuerda que, aun en los momentos más difíciles, la actitud, la disciplina y la resiliencia abren el camino para volver a empezar. Fiel al estilo de Fidel Morales, combina vivencias humanas, valores esenciales e inspiración para quienes buscan un motivo para creer e insistir.",
    paraQuien: "Quienes necesitan un motivo para creer, insistir y confiar en que todo estará bien."
  }
];