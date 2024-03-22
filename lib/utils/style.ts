namespace StyleUtils {
  export const hexToRgba = (hex: string, alpha: string | number) => {
    if (Number(alpha) === 0) {
      return 'transparent';
    }

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    return `rgb(${r}, ${g}, ${b})`;
  };
}

export default StyleUtils;
