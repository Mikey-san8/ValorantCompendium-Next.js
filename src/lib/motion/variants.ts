import { Variants, Transition } from "framer-motion";

// Reusable transitions – use 'as const' for literal types
export const transitions: Record<string, Transition> = {
    default: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1] as const
    },
    spring: {
        type: "spring",
        stiffness: 100,
        damping: 10
    },
    smooth: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const
    },
};

// Fade variants
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: transitions.smooth },
};

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: transitions.smooth },
};

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: transitions.smooth },
};

// Scale variants
export const scaleUp: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: transitions.spring },
};

// Slide variants
export const slideInLeft: Variants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: transitions.smooth },
};

export const slideInRight: Variants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: transitions.smooth },
};

// Stagger children (for lists)
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: transitions.default },
};