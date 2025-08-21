export const changeTheme = (theme, setTheme) => {
    console.log(theme);
    if (theme === "light") {
        document.documentElement.classList.add("dark");
        setTheme("dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.classList.remove("dark");
        setTheme("light");
        localStorage.setItem("theme", "light");
    }
}