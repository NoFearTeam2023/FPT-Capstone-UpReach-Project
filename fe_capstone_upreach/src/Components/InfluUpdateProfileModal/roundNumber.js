const roundNumber = (num) => {
    const map = [
      { suffix: "T", threshold: 1e12 },
      { suffix: "B", threshold: 1e9 },
      { suffix: "M", threshold: 1e6 },
      { suffix: "K", threshold: 1e3 },
      { suffix: "", threshold: 1 },
    ];

    const found = map.find((x) => Math.abs(num) >= x.threshold);

    if (found) {
      let formatted = "";
      if (num < 1000) {
        formatted = (num / found.threshold).toFixed(0) + found.suffix;
      } else formatted = (num / found.threshold).toFixed(1) + found.suffix;
      return formatted;
    }

    return num;
  };
export default roundNumber;