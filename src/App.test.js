import {colorDec, deleteDec, numberF} from './App'

describe("Pruebas funcion deleteDec", () => {
    test("pass 1.2642325 return 1.26",() => {
        expect(deleteDec(1.2642325, 2)).toBe("1.26")
    })
    test("pass 4 decimal return 1.2642", () => {
        expect(deleteDec(1.2642325, 4)).toBe("1.2642")
    })
})
describe("Pruebas funcion colorDec", () => {
    test("return string", () => {
        expect(typeof colorDec(1)).toBe("string")
    })
    test("pass positive number return green" , () => {
        expect(colorDec(2)).toBe("green")
    })
    test("pass negative number return red" , () => {
        expect(colorDec(-2)).toBe("red")
    })
})
describe("Pruebas funcion format", () => {
    test("return string",() => {
        expect(typeof numberF.format(1000)).toBe("string")
    })
})