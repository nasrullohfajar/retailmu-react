export const customStylesInputSelect = (hasError: boolean) => ({
  control: (base: any) => {
    const isSmallScreen = window.innerWidth < 1280;

    return {
      ...base,
      minHeight: isSmallScreen ? "42px" : "46px",
      fontSize: isSmallScreen ? "0.75rem" : "0.875rem",
      padding: "0px 4px",
      cursor: "pointer",
      boxShadow: "none",

      borderColor: hasError ? "#dc2626" : "#e5e7eb",

      "&:hover": {
        borderColor: hasError ? "#dc2626" : "#e5e7eb",
      },
    };
  },

  menu: (base: any) => ({
    ...base,
    fontSize: window.innerWidth < 1280 ? "0.75rem" : "0.875rem",
    zIndex: 9999,
  }),

  menuPortal: (base: any) => ({
    ...base,
    fontSize: window.innerWidth < 1280 ? "0.75rem" : "0.875rem",
    zIndex: 9999,
  }),
});
