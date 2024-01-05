for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        console.log("%c%s", "font: 5em/1 Arial; color: red;", "WARNING");
        console.log('%c%s', "color: #F1D3DE; font: 2em/1 Arial;", "Pasting anything in here could give attackers access to your account data");
    }, 400);
}