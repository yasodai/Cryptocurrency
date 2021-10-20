module.exports = {
  mode: "jit",
  purge: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bgSecondary: `#f0f2f5`,
        pink: `#0071bd`,
        "light-blue": `#e6f7ff`,
        border: `#d9d9d9`,
      },
      boxShadow: {
        card: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 2px 4px 6px -2px rgba(0, 0, 0, 0.05)",
        box: "13px 13px #f3d42e, -10px 10px #33d42e, -5px -10px #ff0d2d, 10px -8px #034d5e",
      },
    },
  },
  variants: {
    extend: {
      divideColor: ["group-hover"],
    },
  },
  plugins: [],
};
