import Link from "next/link";
import Countdown from "./Countdown";
import styles from "./valientes.module.css";

const REGISTRO_URL = "https://tally.so/r/jaNzd1";

const marquee = [
  "12–15 Nov",
  "Campus Lluta km 15",
  "Arica · Chile",
  "Adhesión $35.000",
  "Cupos limitados",
];

const days = [
  {
    n: "12",
    dow: "Jueves",
    place: "Auditorio Comuarica → Campus Lluta",
    title: "Reunión de apertura",
    text: "19:00 a 21:00 reunión de apertura en el auditorio Comuarica. A las 21:00 salida rumbo a Campus Lluta para armar campamento.",
  },
  {
    n: "13",
    dow: "Viernes",
    place: "Campus Lluta",
    title: "Un día completo en campo",
    text: "Plenarias, talleres y los desafíos por escuadrones, con tiempos de adoración y oración.",
  },
  {
    n: "14",
    dow: "Sábado",
    place: "Campus Lluta → Auditorio Comuarica",
    title: "Cierre de campo y regreso",
    text: "Actividades de campo hasta las 18:00. Último día en Campus Lluta. A las 19:00 regreso al auditorio Comuarica.",
  },
  {
    n: "15",
    dow: "Domingo",
    place: "Av. Santa María #2950",
    title: "Culto de clausura",
    text: "Desde las 9:00 AM. A las 10:30 AM celebramos lo vivido junto a las familias y la comunidad.",
  },
];

const kit = [
  {
    title: "Base",
    items: [
      "Bandana Valientes 2025 (si participaste)",
      "Carpa (puedes compartirla con un amigo o familiar)",
      "Saco de dormir",
      "Colchón inflable o colchoneta (lleva un trozo de cartón para evitar pinchaduras)",
    ],
  },
  {
    title: "Vestimenta obligatoria",
    items: [
      "2 poleras color negro (de preferencia con logo Valientes, o sin diseños)",
      "Short color beige o café",
      "Pantalón color beige o café",
      "Short deportivo color negro",
      "Short de baño",
      "Toalla",
      "Gorro color negro (logo Valientes o sin diseño)",
    ],
  },
  {
    title: "Recomendado para evitar picaduras (opcional)",
    items: ["Polera de lycra manga larga color negro", "Pantalón de lycra color negro"],
  },
  {
    title: "Accesorios",
    items: [
      "2 pares de zapatillas deportivas",
      "Sandalias (chalas, hawaianas, condorito)",
      "Útiles de aseo",
      "Repelente para insectos",
      "Bloqueador solar",
      "Linterna",
      "Guantes de seguridad (obligatorios para los desafíos)",
      "Utensilios para comer (plato, cubiertos, vaso, taza)",
      "Botella para agua",
      "Snacks",
    ],
  },
];

const merch = [
  {
    name: "Poleras",
    price: "$9.000",
    img: "/valientes/poleras.jpg",
    alt: "Tres modelos de polera negra Valientes 2026: VLNTS en recuadro, VLNTS Valientes apilado y Valientes",
  },
  {
    name: "Gorras",
    price: "$6.000",
    img: "/valientes/gorras.jpg",
    alt: "Tres modelos de gorra negra Valientes 2026: recuadro Valientes, VLNTS y escudo con U",
  },
];

export default function ValientesPage() {
  return (
    <div className={styles.page}>
      {/* HERO */}
      <header className={styles.hero}>
        <picture className={styles.heroImg}>
          <source media="(max-width: 700px)" srcSet="/valientes/hero-vertical.jpg" />
          <img src="/valientes/hero.jpg" alt="Un hombre sostiene la bandera amarilla de Valientes entre una multitud, bajo un cielo de tormenta" />
        </picture>
        <div className={`${styles.wrap} ${styles.heroInner}`}>
          <p className={`${styles.heroKicker} ${styles.rise}`}>Comunidad presenta</p>
          <h1 className={`${styles.display} ${styles.heroTitle} ${styles.rise} ${styles.rise2}`}>
            Valientes <span>26</span>
          </h1>
          <div className={`${styles.heroMeta} ${styles.rise} ${styles.rise3}`}>
            <span className={`${styles.chip} ${styles.chipGold}`}>12–15 Nov</span>
            <span className={styles.chip}>Campus Lluta km 15</span>
            <span className={styles.chip}>Arica · Chile</span>
            <span className={styles.chip}>Adhesión $35.000</span>
          </div>
          <div className={`${styles.rise} ${styles.rise4}`} style={{ display: "grid", gap: 22 }}>
            <Countdown />
            <div className={styles.heroActions}>
              <a href={REGISTRO_URL} target="_blank" rel="noopener noreferrer" className={styles.btn}>
                Regístrate ahora
              </a>
              <a href="#programa" className={`${styles.btn} ${styles.btnGhost}`}>
                Ver programa
              </a>
              <span className={styles.scarcity}>Cupos limitados</span>
            </div>
          </div>
        </div>
      </header>

      {/* MARQUEE */}
      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[...marquee, ...marquee, ...marquee, ...marquee].map((t, i) => (
            <span key={i} className={styles.marqueeItem}>{t}</span>
          ))}
        </div>
      </div>

      {/* QUÉ ES */}
      <section className={styles.section} id="info">
        <div className={`${styles.wrap} ${styles.about}`}>
          <div>
            <p className={styles.eyebrow}>Qué es</p>
            <h2 className={`${styles.display} ${styles.h2}`}>
              Cuatro dias <em>fuera de la rutina</em>
            </h2>
            <p className={styles.lead}>
              Valientes es una experiencia de formación, aprendizaje y fe: plenarias, talleres, desafíos al aire libre
              y noches de adoración en medio del valle de Lluta.
            </p>
            <p className={styles.pillarsLabel}>Nuestros pilares</p>
            <ul className={styles.pillars}>
              <li>Ganar a Cristo</li>
              <li>Compañerismo y comunión en grupo</li>
              <li>Desafíos físicos</li>
            </ul>
            <p className={styles.body}>
              Nos agrupamos en escuadrones, aprendemos a trabajar en equipo y volvemos a la ciudad habiendo vivido
              una experiencia extraordinaria con Dios.
            </p>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNum}>4</div>
              <div className={styles.statLabel}>Días de experiencia</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>km 15</div>
              <div className={styles.statLabel}>Campus Lluta</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>$35.000</div>
              <div className={styles.statLabel}>Adhesión</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>Cupos</div>
              <div className={styles.statLabel}>Limitados</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMA */}
      <section className={`${styles.section} ${styles.sectionAlt}`} id="programa">
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>Programa</p>
          <h2 className={`${styles.display} ${styles.h2}`}>
            De jueves a <em>domingo</em>
          </h2>
          <div className={styles.days}>
            {days.map((d) => (
              <article key={d.n} className={styles.day}>
                <div className={styles.dayDate}>
                  <b>{d.n}</b>
                  <span>{d.dow} · Nov</span>
                </div>
                <div>
                  <p className={styles.dayPlace}>{d.place}</p>
                  <h3 className={styles.dayTitle}>{d.title}</h3>
                  <p className={styles.dayText}>{d.text}</p>
                </div>
              </article>
            ))}
          </div>
          <p className={styles.note}>El programa detallado se entrega al momento de la acreditación.</p>
        </div>
      </section>

      {/* VIDEO */}
      <section className={styles.section} id="video">
        <div className={`${styles.wrap} ${styles.videoLayout}`}>
          <div>
            <p className={styles.eyebrow}>Mira cómo se vive</p>
            <h2 className={`${styles.display} ${styles.h2}`}>
              Historia de <em>Valientes</em>
            </h2>
            <p className={styles.lead}>
              Años de desafíos, escuadrones y amistades forjadas en Lluta. Dale play y mira de qué se trata.
            </p>
            <a
              href="https://youtube.com/shorts/zDLEMn7RKrY"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnGhost}`}
              style={{ marginTop: 28 }}
            >
              Ver en YouTube
            </a>
          </div>
          <div className={styles.videoFrame}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/zDLEMn7RKrY?rel=0&playsinline=1"
              title="Historia de Valientes"
              loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </section>

      {/* KIT */}
      <section className={`${styles.section} ${styles.sectionAlt}`} id="kit">
        <div className={`${styles.wrap} ${styles.kit}`}>
          <div>
            <p className={styles.eyebrow}>Kit Valientes 2026</p>
            <h2 className={`${styles.display} ${styles.h2}`}>
              Que <em>llevar</em>
            </h2>
            <p className={styles.lead}>
              Esta es la lista básica que necesitarás para participar en el desafío de este año.
            </p>
            <div className={styles.kitGroups}>
              {kit.map((g) => (
                <div key={g.title} className={styles.kitGroup}>
                  <h3>{g.title}</h3>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <figure className={styles.vest}>
            <img
              src="/valientes/vestimentas.jpg"
              alt="Vestimentas oficiales: polera negra, short o pantalón beige o café, y calzado trekking o deportivo. Mangas y calzas largas son opcionales."
              loading="lazy"
            />
            <figcaption>
              Vestimenta oficial de carácter obligatorio. Mangas y calzas largas son opcionales, para evitar picaduras de insectos.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* MERCH */}
      <section className={styles.section} id="merch">
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>Merch oficial</p>
          <h2 className={`${styles.display} ${styles.h2}`}>
            Viste <em>Valientes</em>
          </h2>
          <p className={styles.lead}>
            Tendremos merch a la venta: poleras y gorras de Valientes 2026, con precio especial por evento.
          </p>
          <div className={styles.merchGrid}>
            {merch.map((m) => (
              <article key={m.name} className={styles.merchCard}>
                <img src={m.img} alt={m.alt} loading="lazy" />
                <div className={styles.merchInfo}>
                  <div>
                    <h3 className={`${styles.display} ${styles.merchName}`}>{m.name}</h3>
                    <p className={styles.merchSub}>3 modelos para elegir</p>
                  </div>
                  <p className={styles.merchPrice}>
                    {m.price} <span>c/u</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* INFO PRÁCTICA */}
      <section className={`${styles.section} ${styles.sectionAlt}`} id="datos">
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>Datos clave</p>
          <h2 className={`${styles.display} ${styles.h2}`}>
            Todo lo que <em>necesitas saber</em>
          </h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoCell}>
              <p className={styles.infoLabel}>Cuándo</p>
              <p className={styles.infoValue}>12 al 15 de noviembre</p>
              <p className={styles.infoSub}>Jueves a domingo</p>
            </div>
            <div className={styles.infoCell}>
              <p className={styles.infoLabel}>Dónde</p>
              <p className={styles.infoValue}>Campus Lluta km 15</p>
              <p className={styles.infoSub}>Arica, Chile. Cierre en Av. Santa María #2950.</p>
            </div>
            <div className={styles.infoCell}>
              <p className={styles.infoLabel}>Adhesión</p>
              <p className={styles.infoValue}>$35.000</p>
              <p className={styles.infoSub}>Cupos limitados.</p>
            </div>
            <div className={styles.infoCell}>
              <p className={styles.infoLabel}>Consultas</p>
              <p className={styles.infoValue}>@comuarica</p>
              <p className={styles.infoSub}>Escríbenos por Instagram.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMO LLEGAR */}
      <section className={styles.mapSection} id="como-llegar">
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>Ubicación</p>
          <h2 className={`${styles.display} ${styles.h2}`} style={{ marginBottom: 32 }}>
            Como llegar a <em>Campus Lluta</em>
          </h2>
        </div>

        <div className={styles.mapBand}>
          <div className={styles.mapCard}>
            <h3 className={`${styles.display} ${styles.mapCardName}`}>Campus Lluta</h3>
            <p className={styles.mapCardDesc}>Km 15 · Valle de Lluta · Arica</p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=-18.4045259,-70.1637469"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapCardLink}
            >
              Abrir en Google Maps →
            </a>
          </div>
          <iframe
            src="https://maps.google.com/maps?q=-18.4045259,-70.1637469&t=&z=16&ie=UTF8&iwloc=&output=embed"
            title="Mapa de Campus Lluta"
            loading="lazy"
            allowFullScreen={false}
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        <div className={styles.wrap}>
          <p className={styles.mapNote}>
            <strong>Salida del jueves 12:</strong> 21:00 desde el Auditorio Comuarica, Av. Santa María #2950.
          </p>
        </div>
      </section>

      {/* CIERRE */}
      <section className={styles.final}>
        <div className={styles.finalBg}>
          <img src="/valientes/hero.jpg" alt="" loading="lazy" />
        </div>
        <div className={styles.wrap}>
          <h2 className={`${styles.display} ${styles.finalTitle}`}>Te atreves?</h2>
          <p className={styles.finalText}>
            Los cupos son limitados. Asegura tu lugar en Valientes 26 antes de que se acaben.
          </p>
          <div className={styles.finalActions}>
            <a href={REGISTRO_URL} target="_blank" rel="noopener noreferrer" className={styles.btn}>
              Regístrate en comuarica.cl
            </a>
            <Link href="/" className={`${styles.btn} ${styles.btnGhost}`}>Volver al inicio</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
