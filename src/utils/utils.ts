export const formatValue = (value: string | number): string => {
    if (value === "unknown") {
      return "$ 40.000";
    }
    return `$${Number(value).toLocaleString()}`;
  };