# Política de privacidad de Altalaya

**Última actualización:** 22 de septiembre de 2026

Altalaya es un mapa comunitario de miradores. Esta política explica qué datos recopilamos, por qué y cómo puedes controlarlos.

**Nuestro principio:** no vendemos tus datos. No inventamos estadísticas falsas. Solo usamos tu información para operar la app y mantener segura a la comunidad.

---

## 1. A quién aplica

Esta política cubre:

- La app móvil Altalaya (iOS y Android) y los servicios backend relacionados que operamos
- Este sitio público (páginas legales, enlaces de descarga APK y páginas web relacionadas con Altalaya)

Si no estás de acuerdo con esta política, no uses la app ni el sitio.

---

## 2. Datos que recopilamos

### Información de cuenta

Cuando creas una cuenta (correo o inicio de sesión con Google), podemos almacenar:

- Dirección de correo electrónico
- Nombre visible y nombre de usuario
- Foto de perfil (si añades una)
- Bio (si añades una)
- Identificadores de autenticación de nuestro proveedor (Supabase / Google)
- Estado Early Founder (`is_founder`) si apoyas voluntariamente el proyecto mediante nuestro enlace de pago

### Contenido que creas (UGC)

Cuando añades un spot, foto o texto, almacenamos:

- Título, descripción y etiquetas del spot
- Fotos que subes (seleccionadas de la biblioteca de fotos del dispositivo)
- Ubicación del spot que decides publicar (coordenadas e info del lugar que aportas)
- Marcas de tiempo y autoría para que otros vean quién compartió qué

Antes de la subida, las fotos pueden **redimensionarse y comprimirse en tu dispositivo** (lado cliente) para reducir tamaño y ancho de banda. No usamos tu biblioteca de fotos para nada más que los medios que eliges explícitamente subir.

Puedes eliminar tu propio contenido en cualquier momento desde la app. Eliminarlo lo quita de la vista pública; las copias de seguridad pueden conservar residuos durante un periodo breve por seguridad y recuperación.

### Spots guardados

Si guardas (marcas) un mirador, almacenamos esa asociación en tu cuenta para que tu lista «Guardados» se sincronice entre sesiones. Las listas guardadas son privadas de tu cuenta salvo que luego publiques contenido relacionado.

### Ubicación de tu dispositivo

Solicitamos la **ubicación solo mientras usas la app** (primer plano / «when in use»).

La usamos estrictamente para:

- Centrar el mapa en tu zona actual
- Calcular el azimut solar / ayudas de hora dorada en el mapa

Podemos **guardar en caché la última ubicación conocida en el dispositivo** (almacenamiento local seguro) para reabrir el mapa más rápido. Esa caché permanece en tu dispositivo y no se vende ni se usa para publicidad.

**No** hacemos:

- Seguimiento de ubicación en segundo plano
- Registro continuo de tus movimientos en nuestros servidores
- Venta o compartición de tu posición en vivo con anunciantes

Puedes rechazar o revocar el permiso de ubicación en los ajustes del dispositivo. La app seguirá funcionando, pero el centrado del mapa y las ayudas solares pueden quedar limitados.

### Preferencias y sesión en el dispositivo

Almacenadas localmente en tu dispositivo (p. ej. Expo SecureStore), no se venden:

- Tokens de sesión de autenticación para mantenerte conectado
- Preferencia de tipo de mapa (estándar / satélite / terreno)
- Caché de la última ubicación conocida (ver arriba)

### Datos técnicos y de uso

Para mantener el servicio fiable y seguro, podemos procesar:

- Tipo de dispositivo, versión del SO y versión de la app
- Registros de fallos / errores
- Estado básico de conectividad de red (p. ej. banner offline)
- Tokens de sesión necesarios para mantenerte conectado

### Comentarios que envías

Si usas «Enviar comentarios» en Ajustes, tu dispositivo abre el cliente de correo. Lo que escribas y envíes se trata como correspondencia de correo ordinaria. No rastreamos tu buzón en silencio.

### Reportes y bloqueos (seguridad UGC)

Cuando reportas un spot o bloqueas a otro usuario en la app, almacenamos el mínimo necesario para aplicar tu preferencia y moderar la comunidad:

- **Reportes de spots:** `reporter_id`, `spot_id`, `reason` (texto libre opcional) y una marca de tiempo
- **Bloqueos de usuarios:** `blocker_id`, `blocked_id` y una marca de tiempo

El acceso está protegido con **seguridad a nivel de fila (RLS)** en Supabase para que:

- Puedas crear y gestionar **tus propios** reportes y bloqueos
- Otros usuarios no puedan leer tu lista privada de bloqueos ni tus reportes como un grafo social
- Operadores / herramientas de moderación puedan revisar reportes para mantener segura la comunidad

**Cómo usamos estos datos:**

- **Bloqueos:** ocultar los spots de ese usuario en **tu** vista del mapa (y superficies relacionadas que respeten tu lista)
- **Reportes:** cola para revisión de moderación; un reporte **no** elimina por sí solo el contenido para todos

### Mapas

Las teselas y servicios de mapa los proporciona Google Maps (vía `react-native-maps`). Cuando carga el mapa, Google puede recibir datos técnicos según la [política de privacidad de Google](https://policies.google.com/privacy). No controlamos el procesamiento independiente de Google.

### Este sitio — cookies y analítica

Este sitio es independiente de la app móvil. En el sitio podemos usar:

- **Almacenamiento estrictamente necesario** — por ejemplo recordar tu elección de cookies de analítica en el navegador (`localStorage`). Sirve para respetar tu decisión y no te rastrea entre sitios.
- **Google Analytics 4 (GA4)** — **solo si aceptas** mediante el banner de cookies. Si rechazas (o antes de elegir), **no** cargamos scripts de Google Analytics y **no** enviamos eventos de analítica.

Cuando se acepta la analítica, Google puede procesar datos como:

- Páginas vistas y rutas de navegación aproximadas en este sitio
- Eventos que configuramos (abrir el menú de descarga APK, clics en Drive o VirusTotal, navegar a Privacidad/Términos o contactarnos)
- Ubicación aproximada derivada de la IP (país / región), info técnica de dispositivo / navegador y fuente de referencia
- Identificadores en línea (incluidos cookies o identificadores de cliente similares usados por Google Analytics)

**Finalidad:** entender cómo los visitantes usan este sitio (tráfico, engagement, qué enlaces son útiles) para mejorarlo. **No** usamos Google Analytics en este sitio para publicidad personalizada.

**Base legal (UE/EEE/UK cuando aplique):** consentimiento. Puedes retirar el consentimiento en cualquier momento vía **Ajustes de cookies** en el pie (o borrando datos del sitio en el navegador). La retirada no afecta a la licitud del tratamiento anterior.

**Conservación:** la retención de Google Analytics sigue el ajuste configurado en nuestra propiedad GA4 (normalmente en meses). Tu elección de consentimiento se guarda localmente en el navegador hasta que la cambies o la borres.

**Transferencias internacionales:** Google puede procesar datos de analítica en servidores fuera de la UE/EEE (incluido Estados Unidos). El procesamiento de Google se describe en la [política de privacidad de Google](https://policies.google.com/privacy) y los términos de Google Analytics. Cuando se requiera, esas transferencias se basan en salvaguardas adecuadas ofrecidas por Google (p. ej. Cláusulas Contractuales Tipo).

**Tus opciones:** Aceptar o Rechazar en el banner; cambiar después vía Ajustes de cookies; también controles del navegador / extensiones de exclusión. Bloquear la analítica no impide el acceso a Privacidad, Términos o enlaces de descarga.

### Apoyo voluntario (Early Founder)

Los pagos de apoyo opcionales los procesa **Stripe** en el checkout alojado de Stripe. Stripe gestiona los datos de tarjeta bajo su propia política. Podemos recibir confirmación de que un pago tuvo éxito y guardar un distintivo de fundador en tu perfil. No almacenamos números de tarjeta completos en Altalaya.

---

## 3. Cómo usamos tus datos

Usamos tus datos para:

- Autenticarte y mantener tu cuenta
- Mostrar el mapa comunitario, tu perfil y tus spots guardados
- Alojar fotos e información de spots que publicas
- Calcular ayudas solares en el dispositivo / en la app a partir de la ubicación
- Aplicar el estado Early Founder cuando apoyas el proyecto
- Moderar contenido dañino o ilegal
- Procesar reportes de spots y bloqueos para ocultar contenido en tu mapa y revisar abusos
- Corregir errores y mejorar la fiabilidad
- Cumplir la ley cuando sea necesario

**No** usamos tus datos para reventa publicitaria dirigida y no vendemos datos personales.

---

## 4. Dónde se almacenan los datos y quién los procesa

Usamos **Supabase** para autenticación, base de datos, alojamiento de fotos y tablas de seguridad UGC (incluidas `spot_reports` y `user_blocks`) con RLS. Los datos se procesan en la infraestructura de Supabase bajo sus términos y prácticas de seguridad.

También podemos apoyarnos en:

- **Google** — inicio de sesión con Google y Google Maps (app); Google Analytics 4 en este sitio **solo con tu consentimiento**
- **Stripe** — pagos opcionales Early Founder
- **Apple / Google** — distribución de la app, informes de fallos y servicios de las tiendas, según configuración de esas plataformas
- **Alojamiento web** — nuestro host (p. ej. Vercel) puede procesar registros técnicos de conexión (IP, user-agent, marcas de tiempo) al servir el sitio y asegurar la infraestructura

Estos proveedores procesan datos solo en la medida necesaria para prestarnos sus servicios.

El inicio de sesión OAuth puede volver a la app mediante deep links (p. ej. esquemas de URL personalizados como `altalaya://`). Esas redirecciones llevan tokens de auth solo lo necesario para completar el login.

---

## 5. Compartición

Compartimos datos personales solo cuando:

- Publicas contenido destinado a ser público (spots, fotos, campos de perfil que eliges mostrar)
- Un proveedor de servicios lo necesita para operar Altalaya (p. ej. alojamiento Supabase, Stripe para pagos voluntarios)
- Lo exige la ley (solicitud legal válida)
- Es necesario para proteger a usuarios, al público o la integridad del servicio (fraude, abuso, seguridad), incluida la revisión de reportes

**No** vendemos tu información personal.

---

## 6. Conservación y eliminación de cuenta

- Datos de cuenta: se conservan mientras la cuenta esté activa
- Spots / fotos públicos: hasta que los elimines o los retiremos por infracción de normas
- Asociaciones de spots guardados: hasta que los desguardes o elimines la cuenta
- Bloqueos: hasta que desbloquees o elimines la cuenta
- Reportes: el tiempo razonablemente necesario para moderación, seguridad y disputas
- Sesiones / tokens de auth: hasta que cierres sesión o caduquen
- Registros: solo el tiempo razonablemente necesario para seguridad y depuración

**Eliminación de cuenta en la app:** desde Ajustes puedes eliminar permanentemente tu cuenta. Ese proceso elimina tu perfil, tus spots, fotos asociadas en almacenamiento (mejor esfuerzo), tus bloqueos y cierra tu sesión. Los reportes que presentaste o que afectan a tu contenido pueden conservarse cuando lo exijan motivos legales, de seguridad o de disputa. Pueden existir copias de seguridad residuales brevemente por seguridad y recuperación.

También puedes escribirnos (ver abajo) para solicitar eliminación u otros derechos sobre tus datos.

---

## 7. Tus opciones y derechos

Según dónde vivas (p. ej. UE/EEE, UK, California), puedes tener derecho a:

- Acceder a tus datos personales
- Corregir datos inexactos
- Eliminar tus datos
- Exportar datos que aportaste
- Oponerte o restringir ciertos tratamientos
- Retirar el consentimiento (p. ej. ubicación o biblioteca de fotos, o cookies de analítica del sitio)

En la app ya puedes:

- Editar tu perfil (incluido el avatar desde la biblioteca de fotos)
- Eliminar spots y fotos que subiste
- Guardar / desguardar spots
- Reportar un spot o bloquear a un usuario desde el menú de detalle de un mirador (⋯ → Reportar / Bloquear)
- Cerrar sesión
- Eliminar tu cuenta desde Ajustes
- Revocar permisos de ubicación o medios en los ajustes del sistema

En este sitio puedes:

- Aceptar o rechazar Google Analytics vía el banner de cookies
- Cambiar esa elección en cualquier momento vía **Ajustes de cookies** en el pie
- Leer esta Política de privacidad y los Términos de uso sin aceptar la analítica

Para ejercer otros derechos, escríbenos a la dirección de contacto abajo. Podemos necesitar verificar tu identidad primero.

---

## 8. Menores

Altalaya no está dirigido a menores de 13 años. No recopilamos a sabiendas datos personales de niños. Si crees que un menor ha creado una cuenta, contáctanos y tomaremos las medidas adecuadas.

---

## 9. Seguridad

Usamos protecciones estándar del sector proporcionadas por nuestra pila de alojamiento y autenticación (transporte cifrado, controles de acceso, APIs autenticadas, RLS de Supabase en tablas sensibles como reportes y bloqueos, almacenamiento seguro de sesión en dispositivo cuando esté disponible). Ningún método de transmisión o almacenamiento es 100 % seguro. Usa una contraseña fuerte y protege tu dispositivo.

---

## 10. Naturaleza y responsabilidad outdoor (contexto de datos)

Altalaya ayuda a descubrir lugares reales en la naturaleza. Publicar un spot no otorga permiso para entrar en terrenos privados, ignorar normas locales ni dañar el entorno. Los datos de ubicación que compartes sobre lugares deben ser precisos y respetuosos. Consulta nuestros Términos de uso para las normas de conducta en sitios reales.

---

## 11. Cambios

Podemos actualizar esta política. Cuando lo hagamos, cambiaremos la fecha de «Última actualización» y, cuando corresponda, te avisaremos en la app u otros medios razonables. Seguir usando tras una actualización significa que aceptas la política revisada.

---

## 12. Contacto

Preguntas sobre privacidad o solicitudes de datos:

**Correo:** privacy@altalaya.app  
**App:** Altalaya  
**En la app:** Perfil → Privacidad y Términos, Ajustes → Legal, y detalle de mirador → ⋯ → Reportar / Bloquear
