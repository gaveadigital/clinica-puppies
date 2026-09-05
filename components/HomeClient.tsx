"use client";

import { useEffect } from "react";

const IMG = "https://projetos.gaveadigital.com/clinica-puppies/img";
const WA = "https://wa.me/556133771792";

export default function HomeClient() {
  useEffect(() => {
    let cleanup = () => {};

    (async () => {
      const gsapMod = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const Lenis = (await import("lenis")).default;
      const gsap = gsapMod.default;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
      lenis.on("scroll", ScrollTrigger.update);
      const ticker = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);

      document.body.style.overflow = "hidden";

      const tlIntro = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
        }
      });

      tlIntro
        .to(".loader-bar span", { width: "100%", duration: 1, ease: "power2.inOut", delay: 0.1 })
        .to(".loader-logo", { y: -20, autoAlpha: 0, duration: 0.4, ease: "power1.in" }, "+=0.2")
        .to(".loader", { yPercent: -100, duration: 0.8, ease: "expo.inOut" })
        .fromTo(".gsap-hero", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "back.out(1.5)" }, "-=0.3")
        .fromTo(".gsap-hero-img", { autoAlpha: 0, scale: 0.9, x: 30 }, { autoAlpha: 1, scale: 1, x: 0, duration: 1, ease: "power3.out" }, "-=0.6")
        .fromTo(".gsap-badge", { autoAlpha: 0, scale: 0, y: 20 }, { autoAlpha: 1, scale: 1, y: 0, stagger: 0.15, duration: 0.6, ease: "back.out(2)" }, "-=0.5")
        .fromTo(".gsap-bar", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.2");

      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".gsap-stagger-grid").forEach((grid) => {
        gsap.fromTo(
          grid.children,
          { autoAlpha: 0, y: 40, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(1.2)",
            scrollTrigger: { trigger: grid, start: "top 85%", toggleActions: "play none none reverse" }
          }
        );
      });

      gsap.to(".parallax-hero", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: ".hero-bento", start: "top top", scrub: true }
      });
      gsap.to(".parallax-about", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: { trigger: ".about-art", scrub: true }
      });

      const header = document.getElementById("header");
      const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 10);
      window.addEventListener("scroll", onScroll);

      const toggle = document.getElementById("menuToggle");
      const nav = document.getElementById("nav");
      const onToggle = () => {
        const open = nav?.classList.toggle("is-open");
        toggle?.classList.toggle("is-open", !!open);
      };
      toggle?.addEventListener("click", onToggle);
      nav?.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => {
          nav.classList.remove("is-open");
          toggle?.classList.remove("is-open");
        })
      );

      document.querySelectorAll(".faq-item button").forEach((btn) => {
        btn.addEventListener("click", () => {
          const item = btn.parentElement;
          if (!item) return;
          const open = item.classList.contains("is-open");
          document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("is-open"));
          if (!open) item.classList.add("is-open");
          ScrollTrigger.refresh();
        });
      });

      const waBtn = document.querySelector(".wa");
      const visita = document.getElementById("visita");
      const io = visita
        ? new IntersectionObserver(
            (entries) => {
              waBtn?.classList.toggle("on-dark", entries[0].isIntersecting);
            },
            { threshold: 0.28 }
          )
        : null;
      if (visita && io) io.observe(visita);

      const year = document.getElementById("year");
      if (year) year.textContent = String(new Date().getFullYear());

      const triage = document.getElementById("triage");
      const triageGo = document.getElementById("triageGo") as HTMLAnchorElement | null;
      const pick: Record<string, string> = { pet: "", need: "", when: "" };
      const triageBtns = triage?.querySelectorAll<HTMLButtonElement>(".triage-opts button") ?? [];
      const onPick = (btn: HTMLButtonElement) => {
        const group = btn.parentElement;
        if (!group) return;
        group.querySelectorAll("button").forEach((b) => b.classList.remove("is-on"));
        btn.classList.add("is-on");
        const key = group.getAttribute("data-key");
        if (key) pick[key] = btn.dataset.v || "";
        if (pick.pet && pick.need && pick.when && triageGo && triage) {
          triageGo.href =
            WA +
            "?text=" +
            encodeURIComponent(`Olá! É um ${pick.pet}, preciso de ${pick.need}, preferência: ${pick.when}.`);
          triage.classList.add("is-ready");
        }
      };
      triageBtns.forEach((btn) => btn.addEventListener("click", () => onPick(btn)));

      cleanup = () => {
        window.removeEventListener("scroll", onScroll);
        toggle?.removeEventListener("click", onToggle);
        io?.disconnect();
        gsap.ticker.remove(ticker);
        lenis.destroy();
        ScrollTrigger.getAll().forEach((t) => t.kill());
        document.body.style.overflow = "";
      };
    })();

    return () => cleanup();
  }, []);

  return (
    <>
      <div className="loader" id="loader">
        <div className="loader-inner">
          <img className="loader-logo" src={`${IMG}/logo.png`} alt="Puppies Logo" width={220} height={78} />
          <div className="loader-bar">
            <span />
          </div>
        </div>
      </div>

      <header className="header" id="header">
        <div className="header-inner">
          <a className="logo" href="#topo" aria-label="Puppies Clínica Veterinária">
            <img src={`${IMG}/logo.png`} alt="Puppies" width={220} height={78} />
          </a>
          <nav className="nav" id="nav">
            <a href="#sobre">A clínica</a>
            <a href="#servicos">Serviços</a>
            <a href="#equipe">Equipe</a>
            <a href="#visita">A visita</a>
            <a href="#faq">Dúvidas</a>
            <a href="#contato">Contato</a>
            <a className="btn btn-yellow nav-cta" href={WA} target="_blank" rel="noreferrer">
              Agendar consulta
            </a>
          </nav>
          <a className="btn btn-yellow" href={WA} target="_blank" rel="noreferrer">
            Agendar consulta
          </a>
          <button className="menu-toggle" id="menuToggle" type="button" aria-label="Menu">
            <span />
          </button>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="topo">
          <div className="hero-bento">
            <div className="hero-bento-content">
              <p className="kicker gsap-hero">Samambaia Norte · Brasília</p>
              <h1 className="gsap-hero">
                O cuidado que seu pet <span>merece</span>.
              </h1>
              <p className="lede gsap-hero">
                Clínica geral, especialidades, internação, cirurgias, vacinas e exames — com calma para o animal e
                clareza para quem o ama.
              </p>
              <div className="hero-actions gsap-hero">
                <a className="btn btn-dark" href={WA} target="_blank" rel="noreferrer">
                  Agendar consulta <i className="ph ph-arrow-right" />
                </a>
                <a className="btn btn-ghost" href="#servicos">
                  Ver serviços <i className="ph ph-arrow-right" />
                </a>
              </div>
            </div>
            <div className="hero-bento-visual gsap-hero-img">
              <img className="parallax-hero" src={`${IMG}/puphero3.png`} alt="" />
              <div className="floating-badge badge-1 gsap-badge">
                <span className="ico">
                  <i className="ph-fill ph-shield-check" />
                </span>
                <span>
                  <b>Estrutura completa</b>
                  <small>Consulta ao procedimento</small>
                </span>
              </div>
              <div className="floating-badge badge-2 gsap-badge">
                <span className="ico yellow">
                  <i className="ph-fill ph-paw-print" />
                </span>
                <span>
                  <b>Cães e gatos</b>
                  <small>Filhote ao sênior</small>
                </span>
              </div>
              <div className="floating-badge badge-3 gsap-badge">
                <span className="ico">
                  <i className="ph-fill ph-calendar-check" />
                </span>
                <span>
                  <b>Todos os dias</b>
                  <small>Seg–sex 8h30–19h30</small>
                </span>
              </div>
            </div>
          </div>
          <div className="wrap gsap-bar">
            <nav className="service-bar">
              <a href="#svc-consultas">
                <i className="ph ph-stethoscope" /> Consultas
              </a>
              <a href="#svc-cirurgias">
                <i className="ph ph-first-aid" /> Cirurgias
              </a>
              <a href="#svc-exames">
                <i className="ph ph-magnifying-glass" /> Exames
              </a>
              <a href="#svc-vacinas">
                <i className="ph ph-syringe" /> Vacinas
              </a>
              <a href="#visita">
                <i className="ph ph-clock" /> Todos os dias
              </a>
            </nav>
          </div>
        </section>

        <section className="section" id="sobre">
          <div className="wrap about">
            <div className="about-art gsap-reveal">
              <span className="about-blob" />
              <figure className="about-frame">
                <img className="parallax-about" src={`${IMG}/cli2.fw.png`} alt="Gato atento" />
              </figure>
              <figure className="about-mini">
                <img src={`${IMG}/cli3.fw.png`} alt="Filhote descansando" />
              </figure>
            </div>
            <div className="gsap-reveal">
              <p className="kicker">A clínica</p>
              <h2>Um lugar quieto o suficiente para eles se sentirem em casa.</h2>
              <p>
                A Puppies é o endereço de quem divide a vida com um cão ou um gato em Samambaia e no entorno. O
                atendimento começa na escuta — do tutor e, principalmente, do animal.
              </p>
              <p>
                Unimos clínica geral, especialidades, internação e cirurgias para acompanhar cada fase: do primeiro
                protocolo de vacina ao check-up sênior.
              </p>
              <div className="facts">
                <div className="fact">
                  <b>Todos os dias</b>
                  <span>Inclusive sábado e domingo</span>
                </div>
                <div className="fact">
                  <b>Cães e gatos</b>
                  <span>Do filhote ao idoso</span>
                </div>
                <div className="fact">
                  <b>QS 403</b>
                  <span>Samambaia Norte · DF</span>
                </div>
                <div className="fact">
                  <b>(61) 3377-1792</b>
                  <span>WhatsApp e telefone</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="servicos" style={{ paddingTop: 12, paddingBottom: 40 }}>
          <div className="wrap">
            <div className="section-head gsap-reveal">
              <div>
                <p className="kicker">Serviços</p>
                <h2>Tudo o que a rotina — e o imprevisto — pedem.</h2>
              </div>
              <p className="lede">
                Do preventivo ao procedimento, a equipe conduz com clareza o que o seu pet precisa agora.
              </p>
            </div>
            <div className="svc-catalog gsap-stagger-grid">
              <article className="svc-block" id="svc-consultas">
                <div className="svc-ico">
                  <i className="ph ph-stethoscope" />
                </div>
                <h3>Consultas especiais</h3>
                <ul>
                  <li>Consultas</li>
                  <li>Oncologia</li>
                  <li>Endocrinologia</li>
                  <li>Oftalmologia</li>
                  <li>Neurologia</li>
                  <li>Ortopedia</li>
                  <li>Dermatologia</li>
                </ul>
              </article>
              <article className="svc-block" id="svc-cirurgias">
                <div className="svc-ico">
                  <i className="ph ph-first-aid" />
                </div>
                <h3>Cirurgias</h3>
                <ul>
                  <li>Cirurgias gerais</li>
                  <li>Procedimentos clínicos</li>
                  <li>Tartarectomia</li>
                </ul>
              </article>
              <article className="svc-block" id="svc-exames">
                <div className="svc-ico">
                  <i className="ph ph-scan" />
                </div>
                <h3>Exames de imagem</h3>
                <ul>
                  <li>Radiografia</li>
                  <li>Ultrassonografia</li>
                  <li>Eletrocardiograma</li>
                  <li>Ecocardiograma</li>
                </ul>
              </article>
              <article className="svc-block" id="svc-vacinas">
                <div className="svc-ico">
                  <i className="ph ph-syringe" />
                </div>
                <h3>Vacinas</h3>
                <ul>
                  <li>Múltipla viral canina</li>
                  <li>Antirrábica</li>
                  <li>Giárdia</li>
                  <li>Gripe canina</li>
                  <li>Múltipla viral felina</li>
                </ul>
              </article>
            </div>
            <div className="convenios gsap-reveal">
              <p>Aceita os convênios</p>
              <div className="convenios-logos">
                <img
                  src="https://rede.petlife.com.br/assets/public/636d4f043f76195cc4df9406/header/logo"
                  alt="PetLife"
                  height={32}
                />
                <img src="https://www.doglife.com.br/assets/images/logo-doglife-green.svg" alt="Dog Life" height={32} />
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="triagem" style={{ paddingTop: 12, paddingBottom: 48 }}>
          <div className="wrap">
            <form className="triage triage-wrap gsap-reveal" id="triage" autoComplete="off" onSubmit={(e) => e.preventDefault()}>
              <div>
                <p className="kicker">WhatsApp</p>
                <h2>Diga o que o pet precisa.</h2>
                <p className="lede">Três toques e a mensagem já vai pronta para a clínica.</p>
                <a className="btn btn-dark triage-go" id="triageGo" href={WA} target="_blank" rel="noreferrer" style={{ marginTop: 24 }}>
                  Abrir no WhatsApp <i className="ph-fill ph-whatsapp-logo" />
                </a>
              </div>
              <div className="triage-steps">
                <div className="triage-step">
                  <span>1. Seu pet</span>
                  <div className="triage-opts" data-key="pet">
                    <button type="button" data-v="cão">
                      Cão
                    </button>
                    <button type="button" data-v="gato">
                      Gato
                    </button>
                  </div>
                </div>
                <div className="triage-step">
                  <span>2. O que precisa</span>
                  <div className="triage-opts" data-key="need">
                    <button type="button" data-v="consulta de rotina">
                      Rotina
                    </button>
                    <button type="button" data-v="vacina">
                      Vacina
                    </button>
                    <button type="button" data-v="exame">
                      Exame
                    </button>
                    <button type="button" data-v="atendimento urgente">
                      Urgente
                    </button>
                  </div>
                </div>
                <div className="triage-step">
                  <span>3. Quando</span>
                  <div className="triage-opts" data-key="when">
                    <button type="button" data-v="hoje">
                      Hoje
                    </button>
                    <button type="button" data-v="outro dia">
                      Outro dia
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>

        <section className="section" id="visita" style={{ padding: 0 }}>
          <div className="steps-wrap gsap-reveal">
            <div className="wrap">
              <p className="kicker">A visita</p>
              <h2>Simples de chegar. Cuidadoso de verdade.</h2>
              <div className="steps gsap-stagger-grid">
                <article className="step">
                  <em>01</em>
                  <h3>Chame no WhatsApp</h3>
                  <p>Conte o que está acontecendo. A gente alinha horário, urgência e o que vale levar.</p>
                </article>
                <article className="step">
                  <em>02</em>
                  <h3>Atendimento sem pressa</h3>
                  <p>O pet entra no ritmo dele. Explicamos o que estamos vendo e o próximo passo.</p>
                </article>
                <article className="step">
                  <em>03</em>
                  <h3>Plano claro para casa</h3>
                  <p>Vacina, exame, cirurgia ou só orientação — você sai sabendo o que fazer depois.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="diferenciais" style={{ paddingTop: 20 }}>
          <div className="wrap">
            <div className="section-head gsap-reveal">
              <div>
                <p className="kicker">Por que a Puppies</p>
                <h2>Medicina atenta. Ambiente que não assusta.</h2>
              </div>
            </div>
            <div className="why-grid gsap-stagger-grid">
              <article className="why-card">
                <div className="why-num">01</div>
                <h3>Olhar para o animal inteiro</h3>
                <p>Histórico, comportamento e o contexto de casa entram na conduta — não só o sintoma do dia.</p>
              </article>
              <article className="why-card">
                <div className="why-num">02</div>
                <h3>Tudo no mesmo endereço</h3>
                <p>Consulta, exames, cirurgia e internação conversam entre si. Menos deslocamento, mais continuidade.</p>
              </article>
              <article className="why-card">
                <div className="why-num">03</div>
                <h3>Fim de semana aberto</h3>
                <p>Sábado e domingo, das 9h às 18h. Porque o pet não escolhe o dia para precisar de ajuda.</p>
              </article>
              <article className="why-card">
                <div className="why-num">04</div>
                <h3>Conversa clara</h3>
                <p>O que estamos vendo, o que sugerimos e o porquê. Decisão compartilhada, sem pressa.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="equipe">
          <div className="wrap">
            <div className="section-head gsap-reveal">
              <div>
                <p className="kicker">Equipe</p>
                <h2>Quem cuida do seu pet.</h2>
              </div>
              <p className="lede">
                Veterinários responsáveis pelo atendimento clínico, cirúrgico e de internação — sempre no mesmo
                endereço.
              </p>
            </div>
            <div className="team-grid gsap-stagger-grid">
              <article className="team-card">
                <div className="team-photo">
                  <img src={`${IMG}/doc1.png`} alt="Dra. Ana" />
                </div>
                <div className="team-body">
                  <span>Clínica geral</span>
                  <h3>Dra. Ana Ribeiro</h3>
                  <p>Consultas, check-ups e o primeiro olhar quando o pet chega.</p>
                </div>
              </article>
              <article className="team-card">
                <div className="team-photo">
                  <img src={`${IMG}/doc2.png`} alt="Dr. Lucas" />
                </div>
                <div className="team-body">
                  <span>Cirurgias e internação</span>
                  <h3>Dr. Lucas Mendes</h3>
                  <p>Procedimentos e acompanhamento contínuo, com plano claro para casa.</p>
                </div>
              </article>
              <article className="team-card">
                <div className="team-photo">
                  <img src={`${IMG}/doc3.png`} alt="Dra. Helena" />
                </div>
                <div className="team-body">
                  <span>Felinos e especialidades</span>
                  <h3>Dra. Helena Costa</h3>
                  <p>Olhar aprofundado quando o caso pede mais do que a rotina.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="depoimentos" style={{ paddingTop: 12 }}>
          <div className="wrap">
            <div className="section-head gsap-reveal">
              <div>
                <p className="kicker">Tutores</p>
                <h2>Quem já passou por aqui.</h2>
              </div>
            </div>
            <div className="quotes gsap-stagger-grid">
              <blockquote className="quote big">
                <div className="stars">★★★★★</div>
                <p>
                  “Levei a Luna com medo de clínica. Saímos com ela calma e eu entendendo cada passo. Voltei no outro
                  dia só para agradecer.”
                </p>
                <footer>Mariana S. · tutora da Luna · Samambaia</footer>
              </blockquote>
              <div style={{ display: "grid", gap: 16 }}>
                <blockquote className="quote">
                  <div className="stars">★★★★★</div>
                  <p>“Vacina, exame e orientação no mesmo lugar. Direto e cuidadoso com o Thor.”</p>
                  <footer>Rafael P.</footer>
                </blockquote>
                <blockquote className="quote">
                  <div className="stars">★★★★★</div>
                  <p>“Meu gato odeia sair de casa. Aqui respeitaram o tempo dele.”</p>
                  <footer>Camila R.</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="instagram">
          <div className="wrap">
            <div className="insta-head gsap-reveal">
              <p className="kicker">Galeria</p>
              <h2>Os pets da Puppies</h2>
            </div>
            <div className="insta-grid gsap-stagger-grid">
              <a href="https://www.instagram.com/puppiesdf/" target="_blank" rel="noreferrer">
                <img src={`${IMG}/dog2.jpg`} alt="Pet" />
              </a>
              <a href="https://www.instagram.com/puppiesdf/" target="_blank" rel="noreferrer">
                <img src={`${IMG}/dog1.jpg`} alt="Pet" />
              </a>
              <a href="https://www.instagram.com/puppiesdf/" target="_blank" rel="noreferrer">
                <img src={`${IMG}/dog3.jpg`} alt="Pet" />
              </a>
              <a href="https://www.instagram.com/puppiesdf/" target="_blank" rel="noreferrer">
                <img src={`${IMG}/dog4.jpg`} alt="Pet" />
              </a>
              <a href="https://www.instagram.com/puppiesdf/" target="_blank" rel="noreferrer">
                <img src={`${IMG}/dog5.jpg`} alt="Pet" />
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="faq" style={{ paddingTop: 12 }}>
          <div className="wrap faq">
            <div className="gsap-reveal">
              <p className="kicker">Dúvidas</p>
              <h2>Antes de vir.</h2>
              <p className="lede" style={{ marginTop: 16 }}>
                Não achou o que precisa? Chame no WhatsApp com o contexto do seu pet.
              </p>
            </div>
            <div className="gsap-stagger-grid">
              <div className="faq-item is-open">
                <button type="button">Vocês atendem cães e gatos?</button>
                <div className="faq-panel">
                  <div>
                    <p>
                      Sim. A Puppies é focada em cães e gatos, de filhotes a pets idosos, em consultas de rotina e em
                      situações que pedem mais estrutura.
                    </p>
                  </div>
                </div>
              </div>
              <div className="faq-item">
                <button type="button">Preciso agendar ou posso chegar?</button>
                <div className="faq-panel">
                  <div>
                    <p>
                      O agendamento pelo WhatsApp organiza o dia e reduz espera. Em demanda urgente, fale antes de sair
                      de casa para alinharmos o encaixe.
                    </p>
                  </div>
                </div>
              </div>
              <div className="faq-item">
                <button type="button">Funciona no sábado e no domingo?</button>
                <div className="faq-panel">
                  <div>
                    <p>Sim. Segunda a sexta, 8h30–19h30. Sábado e domingo, 9h–18h.</p>
                  </div>
                </div>
              </div>
              <div className="faq-item">
                <button type="button">Quais serviços vocês oferecem?</button>
                <div className="faq-panel">
                  <div>
                    <p>
                      Clínica geral, especialidades, internação, cirurgias, vacinas e exames. Se o caso pedir
                      encaminhamento extra, orientamos com transparência.
                    </p>
                  </div>
                </div>
              </div>
              <div className="faq-item">
                <button type="button">Onde fica a clínica?</button>
                <div className="faq-panel">
                  <div>
                    <p>QS 403 Conjunto A Lote 3 — Samambaia, Brasília – DF, CEP 72319-550.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="contato" style={{ paddingTop: 20 }}>
          <div className="wrap contact">
            <div className="info gsap-reveal">
              <p className="kicker">Contato</p>
              <h2>Visite-nos.</h2>
              <ul className="info-list">
                <li>
                  <strong>Endereço</strong>
                  QS 403 Conjunto A Lote 3
                  <br />
                  Samambaia, Brasília — DF
                  <br />
                  CEP 72319-550
                </li>
                <li>
                  <strong>WhatsApp e telefone</strong>
                  <a href={WA}>(61) 3377-1792</a>
                </li>
                <li>
                  <strong>Horário</strong>
                  Seg–sex 8h30–19h30
                  <br />
                  Sáb e dom 9h–18h
                </li>
                <li>
                  <strong>E-mail</strong>
                  <a href="mailto:contato@puppies.com">contato@puppies.com</a>
                </li>
              </ul>
              <div className="socials">
                <a href="https://www.instagram.com/puppiesdf/" target="_blank" rel="noreferrer">
                  <i className="ph ph-instagram-logo" />
                </a>
                <a href="https://linktr.ee/puppiesclinicaveterinaria" target="_blank" rel="noreferrer">
                  <i className="ph ph-link" />
                </a>
                <a href={WA} target="_blank" rel="noreferrer">
                  <i className="ph ph-whatsapp-logo" />
                </a>
              </div>
            </div>
            <div className="map gsap-reveal">
              <iframe
                title="Mapa da Clínica Veterinária Puppies em Samambaia"
                loading="lazy"
                src="https://maps.google.com/maps?q=QS%20403%20Conjunto%20A%20Lote%203%20Samambaia%20Brasília%20DF%2072319-550&z=16&output=embed"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <a href="#topo">
                <img src={`${IMG}/logo-full.png`} alt="Puppies" width={220} height={132} />
              </a>
              <p>O cuidado que seu pet merece está aqui. Cães e gatos, de segunda a domingo, em Samambaia Norte.</p>
              <div className="socials" style={{ marginTop: 18 }}>
                <a href="https://www.instagram.com/puppiesdf/" target="_blank" rel="noreferrer">
                  <i className="ph ph-instagram-logo" />
                </a>
                <a href={WA} target="_blank" rel="noreferrer">
                  <i className="ph ph-whatsapp-logo" />
                </a>
              </div>
            </div>
            <div className="foot-col foot-nav">
              <h4>Navegação</h4>
              <ul>
                <li>
                  <a href="#sobre">Sobre</a>
                </li>
                <li>
                  <a href="#servicos">Serviços</a>
                </li>
                <li>
                  <a href="#visita">Como funciona</a>
                </li>
                <li>
                  <a href="#diferenciais">Por que nós</a>
                </li>
                <li>
                  <a href="#faq">Dúvidas</a>
                </li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Horários</h4>
              <div className="foot-hours">
                <div>
                  <span>Segunda a sexta</span>
                  <b>8h30 – 19h30</b>
                </div>
                <div>
                  <span>Sábado e domingo</span>
                  <b>9h – 18h</b>
                </div>
              </div>
            </div>
            <div className="foot-col">
              <h4>Fale com a gente</h4>
              <div className="foot-contact">
                <div className="foot-item">
                  <span className="foot-ico pin">
                    <i className="ph-fill ph-map-pin" style={{ color: "var(--cyan)", fontSize: "1.15rem" }} />
                  </span>
                  <span>
                    QS 403 Conjunto A Lote 3
                    <br />
                    Samambaia, DF
                  </span>
                </div>
                <a className="foot-item" href="mailto:contato@puppies.com">
                  <span className="foot-ico mail">
                    <i className="ph-fill ph-envelope" style={{ fontSize: "1.15rem" }} />
                  </span>
                  <span>contato@puppies.com</span>
                </a>
                <a className="foot-item" href={WA}>
                  <span className="foot-ico phone">
                    <i className="ph-fill ph-phone" style={{ color: "var(--cyan)", fontSize: "1.15rem" }} />
                  </span>
                  <span>(61) 3377-1792</span>
                </a>
              </div>
            </div>
          </div>
          <p className="foot-copy">
            © <span id="year" /> Clínica Veterinária Puppies.
          </p>
        </div>
        <div className="foot-cta">
          <div className="foot-pets">
            <img className="dog parallax-dog" src={`${IMG}/footer-dog.png`} alt="Cachorro" />
          </div>
          <div className="foot-cta-copy">
            <h2>Dê o melhor ao seu pet agora.</h2>
            <div className="foot-cta-actions">
              <a className="btn btn-dark" href={WA} target="_blank" rel="noreferrer">
                <i className="ph-fill ph-whatsapp-logo" /> Agendar consulta
              </a>
              <a className="btn btn-link" href="#servicos">
                Ver serviços <i className="ph ph-arrow-right" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <a className="wa" href={WA} target="_blank" rel="noreferrer">
        <i className="ph-fill ph-whatsapp-logo" style={{ fontSize: "1.25rem", color: "var(--yellow)" }} />
        <span>WhatsApp</span>
      </a>
    </>
  );
}
