export const fadeIn = (direction: string) => {
  return {
    hidden: {
      y: direction === "up" ? 80 : direction === "down" ? -80 : 0,
      opacity: 0,
      x: direction === "left" ? 80 : direction === "right" ? -80 : 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 1.4,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

export const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.6,
    },
  },
  out: {
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.2,
    },
  },
};

export const smallPageVariants = {
  initial: {
    opacity: 0,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  in: {
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.6,
    },
  },
  out: {
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.2,
    },
  },
};

export const slide = (isBack: boolean) => {
  return {
    invisible: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
    exit: {
      opacity: 0,
      transition: {duration: 0.1},
    },
  };
};
