import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight, Check, ChevronDown, FileCheck2, Handshake, Menu, ShieldCheck, X } from 'lucide-react'
import { COMPANY, faqs, plans, processSteps, whatsappMessage } from './content'
import BrandIntro from './components/BrandIntro'
import Logo, { BrandFilters } from './components/BrandLogo'
import Gallery from './components/AutoGallery'
import { HeroWord, WordRibbon, PhotoEssay } from './components/MotionScenes'
import FloatingContact from './components/FloatingContact'
import BrandIcon from './components/BrandIcon'
import { MotionPreferencesProvider, useMotionPreferences } from './hooks/useMotionPreferences'
import { useSceneActivity } from './hooks/useSceneActivity'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { aboutSizes, imageSrcSet } from './assets'

const ease = [0.22, 1, 0.36, 1] as const

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { reduced } = useMotionPreferences()
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.85, delay, ease }}>{children}</motion.div>
}

function Header({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const menuButton = useRef<HTMLButtonElement>(null)
  const instagramLink = useRef<HTMLAnchorElement>(null)
  const menuPanel = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => scrollY.on('change', y => setScrolled(y > 32)), [scrollY])
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const first = menuPanel.current?.querySelector<HTMLAnchorElement>('a')
    first?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); menuButton.current?.focus() }
      if (e.key === 'Tab') {
        const elements = [instagramLink.current, menuButton.current, ...Array.from(menuPanel.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])].filter(Boolean) as HTMLElement[]
        const i = elements.indexOf(document.activeElement as HTMLElement)
        if (e.shiftKey && i <= 0) { e.preventDefault(); elements.at(-1)?.focus() }
        else if (!e.shiftKey && i === elements.length - 1) { e.preventDefault(); elements[0]?.focus() }
      }
    }
    const mq = window.matchMedia('(min-width: 901px)')
    const onWide = () => { if (mq.matches) setOpen(false) }
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onWide)
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', onKey); mq.removeEventListener('change', onWide) }
  }, [open])
  const links = [{ id: 'possibilidades', name: 'A proposta' }, { id: 'como-funciona', name: 'Como funciona' }, { id: 'planos', name: 'Planos' }]
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'menu-is-open' : ''}`}>
    <a className="brand-link" href="#inicio" aria-label="Início" onClick={() => setOpen(false)}><Logo /></a>
    <nav className="desktop-nav" aria-label="Navegação principal">{links.map(l => <a href={`#${l.id}`} key={l.id}>{l.name}</a>)}</nav>
    <div className="header-actions">
      <a href="#contato" className="header-contact" aria-label="Vamos conversar"><span className="contact-label-full">Vamos conversar</span><span className="contact-label-short">Conversar</span><ArrowUpRight size={17} /></a>
      <a ref={instagramLink} className="header-instagram" href={COMPANY.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram do Dr. Márcio (abre em nova aba)" title={COMPANY.instagramHandle}><BrandIcon brand="instagram" /></a>
      <button ref={menuButton} className="menu-toggle" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    <AnimatePresence>{open && <motion.nav ref={menuPanel} id="mobile-navigation" className="mobile-nav" data-lenis-prevent aria-label="Navegação móvel" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <span className="eyebrow">PROPOSTA EXCLUSIVA</span>
      {links.map((l, i) => <a href={`#${l.id}`} key={l.id} onClick={() => setOpen(false)}><small>0{i + 1}</small>{l.name}<ArrowUpRight /></a>)}
      <a href="#contato" onClick={() => setOpen(false)}><small>04</small>Vamos conversar<ArrowUpRight /></a>
      <p>Seus carros em evidência.<br />{' '}Seu tempo livre.</p>
    </motion.nav>}</AnimatePresence>
  </header>
}

function Hero({ ready }: { ready: boolean }) {
  const { reduced } = useMotionPreferences()
  const heroRef = useRef<HTMLElement>(null)
  const active = useSceneActivity(heroRef)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const x = useSpring(mouseX, { stiffness: 65, damping: 24, mass: 1.2 })
  const y = useSpring(mouseY, { stiffness: 65, damping: 24, mass: 1.2 })
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const scrollOffset = useTransform(scrollYProgress, [0, 1], [0, 100])
  const move = (e: ReactPointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType !== 'mouse' || !window.matchMedia('(min-width: 901px)').matches) return
    const r = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX / r.width - 0.5) * 30)
    mouseY.set(((e.clientY - r.top) / r.height - 0.5) * 20)
  }
  return <section id="inicio" className="hero" ref={heroRef} onPointerMove={move} onPointerLeave={() => { mouseX.set(0); mouseY.set(0) }}>
    <motion.div className="hero-art" style={reduced ? {} : { x, y }}>
      <motion.picture style={reduced ? {} : { y: scrollOffset }}>
        <source media="(max-width: 768px)" srcSet="/images/hero-mobile.webp" />
        <img src="/images/hero-desktop.webp" alt="" width="1672" height="941" fetchPriority="high" />
      </motion.picture>
    </motion.div>
    <div className="hero-content">
      <motion.div className="eyebrow" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 0.25 }}><span className="gold-line" />PROPOSTA EXCLUSIVA · DR. MÁRCIO</motion.div>
      <h1 aria-label="Seus carros. Sua próxima venda.">
        {['Seus carros.', 'Sua próxima'].map((line, i) => <span className="line-mask" aria-hidden="true" key={line}><motion.span initial={reduced ? false : { y: '110%' }} animate={ready ? { y: 0 } : {}} transition={{ delay: 0.15 + i * 0.13, duration: 1.05, ease }}>{line}</motion.span></span>)}
        <HeroWord ready={ready} active={active} />
      </h1>
      <motion.div initial={reduced ? false : { opacity: 0, y: 16 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.65, duration: 0.8 }}>
        <p>50 anúncios profissionais no Facebook, Marketplace e Instagram.<br className="desktop-break" /> E uma presença digital à altura do seu nome.</p>
        <a className="button button-dark" href="#planos"><span>Ver os planos</span><ArrowUpRight size={20} /></a>
        <a className="hero-secondary" href="#como-funciona">Entenda como funciona <ArrowDown size={14} /></a>
      </motion.div>
    </div>
    <span className="hero-caption">ANÚNCIOS QUE GERAM CONFIANÇA.</span>
    <a className="scroll-invitation" href="#possibilidades"><span>CONHEÇA A PROPOSTA</span><ArrowDown size={17} /></a>
    <span className="hero-index" aria-hidden="true">01 — PROPOSTA</span>
  </section>
}

function TrustStrip() {
  return <div className="trust-strip">
    <div><ShieldCheck /><span>Anúncios<br />{' '}<strong>com padrão profissional.</strong></span></div>
    <div><FileCheck2 /><span>Facebook, Marketplace<br />{' '}<strong>e Instagram.</strong></span></div>
    <div><Handshake /><span>Contatos<br />{' '}<strong>direto no seu WhatsApp.</strong></span></div>
    <a href="#planos">Ver os planos <ArrowUpRight size={19} /></a>
  </div>
}

function Process() {
  const [active, setActive] = useState(0)
  const step = processSteps[active]
  const { reduced } = useMotionPreferences()
  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return
    e.preventDefault()
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? 3 : (active + (e.key === 'ArrowDown' ? 1 : 3)) % 4
    setActive(next)
    document.getElementById(`step-tab-${next}`)?.focus()
  }
  return <section id="como-funciona" className="process-section wrap section-space">
    <Reveal className="section-heading"><span className="eyebrow">SIMPLES PARA VOCÊ. TRABALHO COM A GENTE.</span><h2>Das fotos do carro<br />{' '}ao <em>cliente no WhatsApp.</em></h2></Reveal>
    <div className="process-grid">
      <Reveal className="process-tabs" delay={0.1}><div role="tablist" aria-label="Etapas do trabalho" aria-orientation="vertical" onKeyDown={onKey}>{processSteps.map((s, i) => <button key={s.title} id={`step-tab-${i}`} className={`process-tab ${active === i ? 'is-active' : ''}`} role="tab" aria-selected={active === i} aria-controls="process-panel" tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)}><span className="step-number">0{i + 1}</span><span>{s.title}</span><ArrowUpRight size={23} /></button>)}</div><p>Você participa de cada decisão.<br />{' '}A nossa equipe acompanha cada etapa.</p></Reveal>
      <Reveal className="process-detail" delay={0.2}><div role="tabpanel" id="process-panel" aria-labelledby={`step-tab-${active}`} tabIndex={0}>
        <div className="process-detail-top"><span className="eyebrow">ETAPA 0{active + 1} / 04</span><FileCheck2 size={27} strokeWidth={1.3} /></div>
        <AnimatePresence mode="wait"><motion.div key={active} initial={reduced ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}><h3>{step.label}</h3><p>{step.text}</p><ul>{step.points.map(p => <li key={p}><Check size={16} />{p}</li>)}</ul></motion.div></AnimatePresence>
        <a href="#contato" className="text-link text-link-light">Escolher um plano <ArrowUpRight size={18} /></a>
      </div></Reveal>
    </div>
  </section>
}

function About() {
  const { reduced } = useMotionPreferences()
  return <section id="sobre" className="about-section">
    <div className="about-grid wrap">
      <Reveal className="about-photo"><div className="about-image-frame"><motion.img initial={reduced ? false : { scale: 1.075 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 1.45, ease }} src="/images/tempo.webp" srcSet={imageSrcSet("tempo")} sizes={aboutSizes} decoding="async" alt="Médico de jaleco" width="1448" height="1086" loading="lazy" /></div><div className="experience-badge"><strong>50</strong><span>ANÚNCIOS<br />{' '}PRONTOS PARA<br />{' '}ENTRAR NO AR</span></div></Reveal>
      <Reveal className="about-content" delay={0.15}><span className="eyebrow">MUITO ALÉM DE UM ANÚNCIO</span><h2>Duas frentes.<br />{' '}Um mesmo nome.<br />{' '}<em>A IA cuida das duas.</em></h2><p className="about-lead">No consultório ou na venda de um carro, o seu nome é o que gera confiança.</p><p>Dr. Márcio, a proposta começa pelos carros, mas não para neles. Conteúdo diário, atendimento com inteligência artificial e automações funcionam para qualquer frente em que o senhor atuar, inclusive a medicina.</p><p>Enquanto o senhor atende, a IA responde comprador, confirma paciente e organiza a agenda. O seu tempo fica para o que só o senhor pode fazer.</p><a className="text-link" href="#planos">Comparar os planos <ArrowUpRight size={18} /></a></Reveal>
    </div>
    <div className="brand-statement" aria-hidden="true"><span>Seus carros em evidência.</span><em>Seu tempo livre.</em></div>
  </section>
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const { reduced } = useMotionPreferences()
  return <section className="faq-section wrap section-space" id="duvidas"><Reveal className="faq-heading"><span className="eyebrow">DÚVIDAS RÁPIDAS</span><h2>Uma boa decisão<br />{' '}começa com<br />{' '}<em>uma boa conversa.</em></h2><a href="#contato" className="text-link">Tire sua dúvida pelo WhatsApp <ArrowUpRight size={18} /></a></Reveal><div className="faq-list">{faqs.map((faq, i) => <div className={`faq-item ${open === i ? 'is-open' : ''}`} key={faq.question}><h3><button id={`faq-button-${i}`} aria-expanded={open === i} aria-controls={`faq-answer-${i}`} onClick={() => setOpen(open === i ? null : i)}><span>{faq.question}</span><ChevronDown size={20} /></button></h3><motion.div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-button-${i}`} initial={false} animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.3 }} style={{ overflow: 'hidden' }} inert={open !== i}><p>{faq.answer}</p></motion.div></div>)}</div></section>
}

function Contact() {
  const wa = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`
  return <section id="contato" className="contact-section">
    <div className="contact-grid wrap">
      <Reveal className="contact-copy"><span className="eyebrow">O PRÓXIMO PASSO</span><h2>Vamos colocar<br />{' '}<em>seus carros</em><br />{' '}no ar?</h2><p>Escolha o plano e chame no WhatsApp.<br />{' '}Os primeiros anúncios começam assim que as fotos chegarem.</p><div className="contact-note"><ShieldCheck size={21} /><span>Sem fidelidade no pacote de anúncios.<br />{' '}Você decide até onde quer ir.</span></div></Reveal>
      <Reveal className="contact-form-wrap" delay={0.15}><div className="contact-form"><div className="form-heading"><span>{COMPANY.name}</span><span className="eyebrow">{COMPANY.crm}</span></div><p className="form-info">{COMPANY.address}</p><a className="button button-gold" href={wa} target="_blank" rel="noopener noreferrer"><span>Falar no WhatsApp</span><ArrowUpRight size={20} /></a><a className="contact-email" href={COMPANY.instagram} target="_blank" rel="noopener noreferrer"><BrandIcon brand="instagram" /><span>{COMPANY.instagramHandle}</span><ArrowUpRight size={20} /></a></div></Reveal>
    </div>
  </section>
}

function Plans() {
  const wa = (plan: string) => `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(`Olá! Tenho interesse no plano ${plan}.`)}`
  return <section id="planos" className="plans-section wrap section-space">
    <Reveal className="section-heading"><span className="eyebrow">PLANOS</span><h2>Escolha até onde<br />{' '}<em>você quer ir.</em></h2></Reveal>
    <div className="plans-grid">{plans.map((p, i) => <Reveal key={p.name} delay={0.08 * i} className={`plan-card ${p.featured ? 'is-featured' : ''}`}>
      <span className="eyebrow">{p.tag}</span><h3>{p.name}</h3><p className="plan-price">{p.price}<small>{p.note}</small></p><p className="plan-text">{p.text}</p>
      <ul>{p.points.map(pt => <li key={pt}><Check size={16} />{pt}</li>)}</ul>
      <a className={`button ${p.featured ? 'button-gold' : 'button-dark'}`} href={wa(p.name)} target="_blank" rel="noopener noreferrer"><span>Quero este plano</span><ArrowUpRight size={20} /></a>
    </Reveal>)}</div>
  </section>
}

function Footer() {
  const { paused, toggle } = useMotionPreferences()
  return <footer className="site-footer wrap"><div className="footer-main"><a href="#inicio" aria-label="Voltar ao início"><Logo /></a><p>Seus carros em evidência.<br />{' '}<em>Seu tempo livre.</em></p><div className="footer-actions"><a className="footer-instagram" href={COMPANY.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram do Dr. Márcio (abre em nova aba)"><BrandIcon brand="instagram" /><span>{COMPANY.instagramHandle}</span></a><a href="#inicio" className="back-top">VOLTAR AO TOPO <ArrowUpRight size={19} /></a></div></div><div className="footer-bottom"><span>© 2026 {COMPANY.name} · {COMPANY.crm}</span><span>{COMPANY.address}</span></div><button className="motion-toggle" onClick={toggle} aria-pressed={paused}>{paused ? 'Retomar movimento' : 'Pausar movimento'}</button><p className="footer-legal">Proposta comercial personalizada. Imagens ilustrativas.</p></footer>
}

function Site() {
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  useSmoothScroll(!loading && !menuOpen)
  const complete = useCallback(() => setLoading(false), [])
  const { reduced } = useMotionPreferences()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  useEffect(() => {
    if (!loading) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [loading])
  return <>
    <BrandFilters />
    <AnimatePresence>{loading && <BrandIntro onComplete={complete} />}</AnimatePresence>
    <div inert={loading} style={{ '--reveal-state': loading ? 'paused' : 'running' } as CSSProperties}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <motion.div className="reading-progress" style={{ scaleX: reduced ? scrollYProgress : progress }} />
      <Header open={menuOpen} setOpen={setMenuOpen} />
      <main id="conteudo">
        <Hero ready={!loading} />
        <TrustStrip />
        <section className="intro-section wrap section-space" id="possibilidades"><Reveal><span className="eyebrow">A PROPOSTA</span><h2>Carro parado<br />{' '}<em>é dinheiro parado.</em></h2></Reveal><Reveal className="intro-copy" delay={0.2}><p>Hoje, a maioria dos compradores começa a busca pelo celular: Facebook, Marketplace e Instagram. Quem aparece bem nessas vitrines vende primeiro.</p><p>Esta proposta coloca os seus 50 carros no ar com padrão profissional e mostra como ir além: presença digital constante e atendimento automático, para nenhum interessado ficar sem resposta.</p><a className="text-link" href="#como-funciona">Veja como funciona <ArrowUpRight size={18} /></a></Reveal></section>
        <WordRibbon />
        <Gallery />
        <Process />
        <Plans />
        <About />
        <PhotoEssay />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      {!loading && !menuOpen && <FloatingContact />}
    </div>
  </>
}

export default function App() {
  return <MotionPreferencesProvider><Site /></MotionPreferencesProvider>
}
