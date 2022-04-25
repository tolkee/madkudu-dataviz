import { useEffect, useState } from "react";
import { generateLightColorHsl } from "../utils";

function useRandomColors(nbOfColors: number) {
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    const generatedColors = [...Array(nbOfColors)].map(() => {
      return generateLightColorHsl();
    });

    setColors(generatedColors);
  }, [nbOfColors]);

  return colors;
}

export default useRandomColors;
