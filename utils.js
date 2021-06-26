const { rejects } = require("assert");
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

const verifyStockOnly = (data,...rest)=>{
	const [product,stockQuery] = rest
	const [productFiltered] = data.filter(({producto}) => producto == product )

	if(!productFiltered){
		console.log(`El producto "${product}" no se encuentra en el inventario`)
		return false
	}
	if(Number(productFiltered?.stock ?? 0) - Number(stockQuery) >= 0) {
		console.log(`Hay stock, ${JSON.stringify(productFiltered.stock)} unidades.` )
		return true 
	}
	else  {
		console.log("no queda stock para esa venta")
		return false
	}
}
const getData = async (data) => {
	return new Promise((resolve,reject)=>{
		setTimeout(() => {
			resolve(data)
		}, 2000);
	})
	
}
const doSelling = (responseUser, db)=>{
	const [product,stockQuery] = responseUser 
	db.map(d => {
		d.originalPrice = d.precio
		if(d.producto === product){
			d.stock -=  stockQuery
			if(d.stock < 15){
				d.precio = d.originalPrice * 1.15
			}	
			return d		
		}
		return d
	})
	console.log(db)
}
module.exports = [showMenu,verifyStockOnly,log,rl,getData,doSelling]