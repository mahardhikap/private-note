import { useEffect, useState } from "react";

const TypingAnimation = ({ texts }: { texts: string[] }) => {
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delay, setDelay] = useState(100);

  useEffect(() => {
    const currentString = texts[index];

    if (isDeleting) {
      setDelay(100);
      if (currentText?.length > 0) {
        setTimeout(() => {
          setCurrentText(currentText?.slice(0, currentText.length - 1));
        }, delay);
      } else {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setDelay(200);
      }
    } else {
      if (currentText.length < currentString.length) {
        setTimeout(() => {
          setCurrentText(currentText + currentString.charAt(currentText.length));
        }, delay);
      } else {
        setIsDeleting(true);
      }
    }
  }, [currentText, isDeleting, index, texts, delay]);

  return (
    <span className="text-xl">{currentText}</span>
  );
};

export default TypingAnimation;