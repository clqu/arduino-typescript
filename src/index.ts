/*
    * Arduino UNO, LCD 16x2 I2C
    * Using PCF8574A
*/

import { Board, LCD } from "johnny-five";

const board = new Board({
    port: "COM7"
});

board.on("ready", () => {
    var p = new LCD({
        pins: ['A4', 'A5'],
        controller: 'PCF8574A'
    });

    let letters = [
        "Hello World!",
        "This text is longer than 16 characters so it will be split into 2 lines."
    ]

    p.clear();

    letters.forEach((letter, i) => {
        setTimeout(() => {
            if (letter.length > 16) {
                const [line1, line2] = [letter.slice(0, 16), letter.slice(16)]
                p.cursor(0, 0).print(line1);
                p.cursor(1, 0).print(line2.slice(0, 16));
            } else {
                p.cursor(0, 0).print(letter);
            }
        }, i * 500);
    });
});