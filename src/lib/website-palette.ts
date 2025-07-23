import { createPalettes, RadixColor } from "./helper";

export const lime = {
  lime1: "#fcfdf9",
  lime2: "#f8fded",
  lime3: "#eefdc2",
  lime4: "#e4f8a2",
  lime5: "#d8f084",
  lime6: "#cae177",
  lime7: "#bbd06c",
  lime8: "#a4bb41",
  lime9: "#dcff00",
  lime10: "#caea0c",
  lime11: "#6d8000",
  lime12: "#39401e",
};

export const lavender = {
  lavender1: "#fdfdff",
  lavender2: "#f7f8ff",
  lavender3: "#f0f1ff",
  lavender4: "#e4e6ff",
  lavender5: "#d9daff",
  lavender6: "#cacbff",
  lavender7: "#b6b5ff",
  lavender8: "#9b96ff",
  lavender9: "#6b46ff",
  lavender10: "#5f3be6",
  lavender11: "#5f3ce6",
  lavender12: "#2d1e73",
};

export const navy = {
  navy1: "#ebedfC",
  navy2: "#aeb1cf",
  navy3: "#5b5e79",
  navy4: "#696b87",
  navy5: "#5b5e79",
  navy6: "#42455e",
  navy7: "#35374f",
  navy8: "#2c2e46",
  navy9: "#25263e",
  navy10: "#1d1f34",
  navy11: "#141523",
  navy12: "#03030d",
};

export const slate = {
  slate1: "#fcfcfe",
  slate2: "#f9f9fd",
  slate3: "#eff0f6",
  slate4: "#e7e8f0",
  slate5: "#dfe0eb",
  slate6: "#d7d8e5",
  slate7: "#cccedd",
  slate8: "#b8bace",
  slate9: "#7c7e90",
  slate10: "#6f7183",
  slate11: "#626372",
  slate12: "#1e1f2a",
};

export const gray = {
  gray1: "#fbfdff",
  gray2: "#f7f9fb",
  gray3: "#eef0f3",
  gray4: "#e6e8eb",
  gray5: "#dee1e4",
  gray6: "#d6d9dc",
  gray7: "#cbced1",
  gray8: "#b9bbbe",
  gray9: "#8a8d8f",
  gray10: "#808285",
  gray11: "#616466",
  gray12: "#1e2022",
};

export const black = {
  black1: "#fcfcfc",
  black2: "#f8f8f8",
  black3: "#f4f4f4",
  black4: "#efefef",
  black5: "#ebebeb",
  black6: "#e7e7e7",
  black7: "#e0e0e0",
  black8: "#cecece",
  black9: "#9a9a9a",
  black10: "#909090",
  black11: "#7b7b7b",
  black12: "#181818",
};


const { colors } = createPalettes(lime, lavender, navy, slate, gray, black)

export const websitePalette: RadixColor[] = colors
