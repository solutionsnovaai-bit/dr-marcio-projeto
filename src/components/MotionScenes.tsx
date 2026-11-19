import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { chapters } from '../content'
import { imageSrcSet } from '../assets'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import { useSceneActivity } from '../hooks/useSceneActivity'

const ease = [0.22, 1, 0.36, 1] as const
const words = ['conquista.', 'consulta.', 'venda.', 'agenda.']

export function HeroWord({ ready, active }: { ready: boolean; active: boolean }) {
  const { reduced } = useMotionPreferences()
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (!ready || !active || reduced) return
    const timer = window.setInterval(() => setIndex(i => (i + 1) % words.length), 2800)
    return () => clearInterval(timer)
  }, [ready, active, reduced])
  return <span className="hero-word-slot serif-italic" aria-hidden="true"><span className="hero-word-sizer">conquista.</span><AnimatePresence initial={false} mode="popLayout"><motion.span className="hero-word" key={index} initial={{ y: '110%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-105%', opacity: 0 }} transition={{ duration: reduced ? 0 : 0.65, ease }}>{words[index]}</motion.span></AnimatePresence></span>
}

export function WordRibbon() {
  const ref = useRef<HTMLDivElement>(null)
  const active = useSceneActivity(ref)
  const { reduced } = useMotionPreferences()
  return <div ref={ref} className={`word-ribbon ${active && !reduced ? 'is-moving' : ''}`} aria-label="Mais pacientes. Mais vendas. Mais tempo.">
    <div className="word-ribbon-track" aria-hidden="true">{[0, 1].map(copy => <div className="word-ribbon-group" key={copy}><span>Mais <em>pacientes.</em></span><ArrowUpRight /><span>Mais <em>vendas.</em></span><ArrowUpRight /><span>Mais <em>tempo.</em></span><ArrowUpRight /></div>)}</div>
  </div>
}

export function ImageFilmstrip() {
  const ref = useRef<HTMLDivElement>(null)
  const active = useSceneActivity(ref)
  const { reduced } = useMotionPreferences()
  return <div ref={ref} className={`image-filmstrip ${active && !reduced ? 'is-moving' : ''}`} aria-hidden="true">
    <div className="filmstrip-track">{[0, 1].map(copy => <div className="filmstrip-group" key={copy}>{chapters.map(c => <div className="filmstrip-frame" key={c.image}><img src={`/images/${c.image}-640.webp`} width="640" height="480" alt="" loading="lazy" decoding="async" /><span>{c.category}</span></div>)}</div>)}</div>
  </div>
}

export function PhotoEssay() {
  const ref = useRef<HTMLElement>(null)
  const { reduced } = useMotionPreferences()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const firstY = useTransform(scrollYProgress, [0, 1], [75, -55])
  const secondY = useTransform(scrollYProgress, [0, 1], [-45, 55])
  const thirdY = useTransform(scrollYProgress, [0, 1], [100, -70])
  const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1.1, 1, 1.03])
  const cards = [
    { image: 'chaves', alt: 'Modelo anatômico da coluna', title: 'Mais pacientes.', tag: 'CONTEÚDO QUE GERA CONSULTA', y: firstY },
    { image: 'veleiro', alt: 'Exercício de reabilitação', title: 'Menos esforço.', tag: 'A IA CUIDA DO RESTO', y: secondY },
    { image: 'destinos', alt: 'Pessoa com a mão no ombro', title: 'Mais tempo.', tag: 'ATENDIMENTO 24H COM IA', y: thirdY },
  ]
  return <section className="photo-essay section-space" ref={ref} aria-label="Planos que merecem acontecer">
    <div className="wrap essay-heading"><span className="eyebrow">PRESENÇA QUE TRABALHA POR VOCÊ.</span><h2>Menos <em>tarefa.</em><br />{' '}Mais <span>resultado.</span></h2><p>Enquanto você atende seus pacientes,<br />{' '}a IA atende compradores e agenda consultas.</p></div>
    <div className="essay-grid wrap">{cards.map((card, i) => <motion.figure key={card.image} className={`essay-card essay-card-${i + 1}`} style={reduced ? {} : { y: card.y }}><div className="essay-image"><motion.img style={reduced ? {} : { scale }} src={`/images/${card.image}.webp`} srcSet={imageSrcSet(card.image)} sizes="(max-width: 768px) 85vw, 31vw" width="1448" height="1086" alt={card.alt} loading="lazy" decoding="async" /></div><figcaption><span>{card.tag}</span><h3>{card.title}</h3></figcaption></motion.figure>)}</div>
    <div className="essay-foot wrap"><span>Seu próximo capítulo tem a sua assinatura.</span><a className="text-link" href="#contato">Comece por uma conversa <ArrowUpRight size={18} /></a></div>
  </section>
}
