import { useInView } from "react-intersection-observer";

export function useScrollSpy(id, onInView) {
  const { ref } = useInView({
    rootMargin: "-80px 0px -85% 0px",
    threshold: 0,
    onChange: (inView) => {
      if (inView) onInView(id);
    },
  });
  return ref;
}
