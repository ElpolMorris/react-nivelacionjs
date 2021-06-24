const chalk = require("chalk");
const log = console.log;
const readline = require("readline")
const rl = readline.createInterface(process.stdin, process.stdout);

const showMenu = (time = 3000) => {
    setTimeout(()=>{
        log(chalk.blue.underline.bold("Que desea hacer: (ingrese un número)\n"))
        rl.setPrompt("elija: \n - 1 ver datos completos\n - 2 ver stock de productos\n - 3 Buscar producto\n - 4 calcular totales\n - 5 verificar stock disponible según cantidad \n - 6 Venta de productos \n\n o ingrese exit para salir. ");
        rl.prompt();
    },time)
}

const verifyStock = (...rest)=>{
	const [product,stockQuery] = rest
	const [productFiltered] = data.filter(({producto}) => producto == product )

	if(!productFiltered){
		return `El producto "${product}" no se encuentra en el inventario`
	}
	if(Number(productFiltered?.stock ?? 0) - Number(stockQuery) > 0) {
		//productFiltered.stock - Number(stockQuery)
		return `Hay stock, ${JSON.stringify(productFiltered.stock)} unidades.` 
	}
	else  {
		return "no queda stock para esa venta"
	}
}

module.exports = [showMenu,verifyStock,log,rl]