const chalk = require("chalk");
const [showMenu,verifyStock,log,rl] = require("./utils")
const {data} = require("./data")

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
						data.forEach(d => log(chalk.yellow(`${JSON.stringify(d)}\n`)))						
					} else {
						throw new Error ("No se encontraron coincidencias")
					}
				} catch (error) {
					log(chalk.red(error.message))
				}finally{
					showMenu(6000)
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
			const total = data.reduce((acc,item)=> acc + (item.precio*item.stock),0)
			log(chalk.green.underline(`$${total}.-`))
			showMenu()
			break;
		case "5":
			rl.question("ingrese nombre de producto y cantidad\n",(answer)=>{
				const respuestas = answer.split(' ')				
				const isNotEmpty = respuestas.every(answer => answer)
				isNotEmpty && respuestas.length == 2 ? log(chalk.black.bgBlueBright(verifyStock(...respuestas))) : log(chalk.red("consulta errónea"))
				showMenu() 
			})
		break;
		case "6":
			console.log("el apartado de las compras")
			showMenu()
		break;
		case "exit":
			console.log("Nos veremos pronto");
			process.exit(0);
		break;
	}
})
rl.on("close",()=>{
	log(chalk.green("cerrando programa..."))
})
