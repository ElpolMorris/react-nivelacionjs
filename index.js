const chalk = require("chalk");
const {data} = require("./data")
const [showMenu,verifyStockOnly,log,rl,getData,doSelling] = require("./utils")


showMenu()

rl.on("line",(lines)=>{
	const lineObject = {
			value: lines.trim(),
		};
	switch (lineObject.value) {
		case "1":
			rl.question("mostrar: verdura - fruta - todo\n",async (answer)=>{
				try {
					const dataProducts = await getData(data);
					if(answer == "verdura" || answer == "fruta"){						
						const productosFiltrados = await dataProducts.filter( d => d.tipo == answer)
						for(const producto in productosFiltrados){
							log(chalk.yellow(JSON.stringify(productosFiltrados[producto])))
						}
					} else if (answer == "todo"){
						await dataProducts.forEach(d => log(chalk.yellow(`${JSON.stringify(d)}\n`)))						
					} else {
						throw new Error ("No se encontraron coincidencias")
					}
				} catch (error) {
					log(chalk.red.bgWhite(error.message))
					log(error)
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
			rl.question("que producto desea buscar \n",async (answer)=>{
				const dataProducts = await getData(data)
				const productoBuscado = dataProducts.find(d => d.producto == answer)
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
			rl.question("ingrese nombre de producto y cantidad\n",async(answer)=>{
				const respuestas = answer.split(' ')				
				const isNotEmpty = respuestas.every(answer => answer)
				const dataProducts = await getData(data)
				isNotEmpty && respuestas.length == 2 ? log(chalk.black.bgBlueBright(verifyStockOnly(dataProducts,...respuestas))) : log(chalk.red("consulta errónea"))
				showMenu() 
			})
		break;
		case "6":
			rl.question("ingrese un producto y cantidad a vender \n",async(answer)=>{
				const respuestas = answer.split(' ')				
				const isNotEmpty = respuestas.every(answer => answer)
				const dataProducts = await getData(data)
				if(isNotEmpty && respuestas.length == 2){
					const isStock = verifyStockOnly(dataProducts,...respuestas)
					if(isStock){
						doSelling(respuestas, dataProducts)
					}
				}
				else {
					log(chalk.red("consulta errónea"));
				}

				showMenu() 
			})
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
