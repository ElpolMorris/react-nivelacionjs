const chalk = require("chalk");
const log = console.log;
const readline = require("readline")
const rl = readline.createInterface(process.stdin, process.stdout);

const {data} = require("./data")

const showMenu = () => {
	log(chalk.blue.underline.bold("Que desea hacer: (ingrese un número)\n"))
	rl.setPrompt("elija: \n - 1 ver datos completos\n - 2 ver stock de productos\n - 3 Buscar producto\n - 4 calcular totales\n - 5 verificar stock disponible según cantidad\n\no ingrese exit para salir. ");
	rl.prompt();
}
showMenu()

rl.on("line",(lines)=>{
	const lineObject = {
			value: lines.trim(),
		};
	switch (lineObject.value) {
		case "1":
			rl.question("mostrar: verdura - fruta - todo\n",(answer)=>{
				try {
					if(answer == "verdura" || answer == "fruta"){						
						const productosFiltrados = data.filter( d => d.tipo == answer)
						for(const producto in productosFiltrados){
							log(chalk.yellow(JSON.stringify(productosFiltrados[producto])))
						}
					} else if (answer == "todo"){
						log(chalk.yellow(JSON.stringify(data)))
					} else {
						throw new Error ("No se encontraron coincidencias")
					}
				} catch (error) {
					log(chalk.red(error.message))
				}finally{
					setTimeout(()=>{
						showMenu()
					},4000)
				}
			})
			
		break;
		case "2":
			const lista = data.map(({ producto,stock }) => ({producto,stock}));
			lista.forEach( ({producto,stock}) => log(chalk.green(` - ${producto}: ${stock} unidades`)))
			showMenu()
			break;
		case "3":
			rl.question("que producto desea buscar \n",(answer)=>{
				const productoBuscado = data.find(d => d.producto == answer)
				try {
					if(!productoBuscado)  throw new Error("no encontrado");
					log(chalk("la respuesta fue \n" + JSON.stringify(productoBuscado)))
					if(productoBuscado.stock === 0) log(chalk.bgRed("este producto no tiene stock"))
				} catch (error) {
					log(chalk.red(error.message))
				}finally{
					showMenu()
				}				
			})
			break;
		case "4":
			const total = data.reduce((acc,item)=> acc + item.precio,0)
			log(chalk.green.underline(total))
			showMenu()
			break;
		case "5":
			rl.question("ingrese nombre de producto y cantidad\n",(answer)=>{
				log(chalk.black.bgCyan(answer.trim()))
			})
			break;
		case "exit":
			console.log("Nos veremos pronto");
			process.exit(0);
		break;
	}
})
rl.on("close",()=>{
	log(chalk.green("nos fuimos"))
})
