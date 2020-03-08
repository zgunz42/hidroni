import React from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function FadeInUp({ children, delay, style, ...props }) {
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0,
    rootMargin: "-100px 0px",
  })
  const controls = useAnimation()

  if (inView) {
    controls.start(i => ({
      visibility: "visible",
      opacity: 1,
      transform: "none",
      transition: { delay: i * 0.3 },
    }))
  }

  return (
    <motion.div
      ref={ref}
      transition={{ ease: "easeOut", duration: 0.5 }}
      initial={{
        opacity: 0,
        visibility: "hidden",
        transform: "translate3d(0, 40px, 0)",
      }}
      custom={delay || 0}
      animate={controls}
      style={{
        ...style,
        animationFillMode: "both",
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
