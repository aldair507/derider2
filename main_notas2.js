const  midiv = document.getElementById('midiv');
// const mibtn = document.getElementById('mibtn');
const tabla = document.getElementById('tabla');

const btn = document.getElementById('añadir');
const btn2 = document.getElementById('añadir2');

let array = [];



btn.addEventListener('click', () =>{
    midiv.classList.remove('ola')
    midiv.classList.add('modal');
});

btn2.addEventListener('click', () =>{
    midiv.classList.add('ola');
});


const settext = data=>{
    tabla.innerHTML = '';
    let head = document.createElement('thead');
    head.innerHTML = `<th>Identificacion</th>
    <th>Nombre</th>
    <th>Nota 1</th>
    <th>Nota 2</th>
    <th>Nota 3</th>
    <th>Nota def</th>
    <th>Funciones</th`;
array.forEach((e,i)=>{
    console.log(e);
    let edit = document.createElement('button');
    edit.textContent = 'Editar';
    let save = document.createElement('button');
    save.textContent = 'Guardar';
    let eliminar1 = document.createElement('button');
    eliminar1.textContent= 'Eliminar'
    edit.addEventListener('click',()=>{editar(i)});
    save.addEventListener('click',()=> {guardar(i)});
    
    let tablita = document.createElement('tr');
    let ident = document.createElement('td');
    ident.innerHTML = `<td><input type='text' id='input1_${i}' value = ' ${e.id}' disabled = ""></td>`;
    let nombre = document.createElement('td');
    nombre.innerHTML =`<td><input type='text' id='input2_${i}' value = '${e.nom}' disabled = ""></td>`;
    let nota1 = document.createElement('td');
    nota1.innerHTML =`<td><input type='number' id='input3_${i}' value = '${e.nota[0]}' disabled = ""></td>`;
    let nota2 = document.createElement('td');
    nota2.innerHTML =`<td><input type='number' id='input4_${i}' value = '${e.nota[1]}' disabled = ""></td>`;
    let nota3 = document.createElement('td');
    nota3.innerHTML =`<td><input type='number' id='input5_${i}' value = '${e.nota[2]}' disabled = ""></td>`;
    let definitiva = document.createElement('td');
    definitiva.innerHTML = `<td><input type='number' id='input6_${i}' value = '${e.def}' disabled></td>`;
    tablita.appendChild(ident);
    tablita.appendChild(nombre);
    tablita.appendChild(nota1);
    tablita.appendChild(nota2);
    tablita.appendChild(nota3);
    tablita.appendChild(definitiva);
    tablita.appendChild(edit);
    tablita.appendChild(save);
    tablita.appendChild(eliminar1);
    head.appendChild(tablita);
    tabla.appendChild(head);
    // midiv.innerText = data;
    eliminar1.onclick = ()=>{
        elimar(e.ideli)
    }
})
}

function elimar (id){
console.log('borrado', id);
array = array.filter(e => e.ideli !== id);
settext();
}


function editar(i) {
    let input1 = document.getElementById(`input1_${i}`);
    let input2 = document.getElementById(`input2_${i}`);
    let input3 = document.getElementById(`input3_${i}`);
    let input4 = document.getElementById(`input4_${i}`);
    let input5 = document.getElementById(`input5_${i}`);

    let arr = [input1, input2, input3, input4, input5];

    arr.forEach(e => {
        e.disabled = false;
    });

    return new Promise((resolve, reject) => {
        resolve(arr.map(e => e.value));
    });
}


const guardar = async (i) => {
    try{
        const nvalor= await editar(i)
        array[i].id = nvalor[0];
        array[i].nom = nvalor[1];
        array[i].nota[0] = parseFloat(nvalor[2]);
        array[i].nota[1] = parseFloat(nvalor[3]);
        array[i].nota[2] = parseFloat(nvalor[4]);

        const nuevadef = (array[i].nota[0] + array[i].nota[1] + array[i].nota[2]) / 3;
        array[i].def = nuevadef;

        nvalor.forEach((valor, e) => {
            let input = document.getElementById(`input${e + 1}_${i}`);
            input.value = valor;
            input.disabled = true;
        });
        settext();
    }catch(error){
        console.log("error al guadrar",error)
    }
    

}




const getdata = () =>{
    return new Promise((resuleve,rechaza)=>{
    settext('¿Quieres Calcular?')
    setTimeout(()=>{
        resuleve(true);},100) 
    })
}

        const showdata = async (notas,id,nom) =>{

            try{
                settext("esperando autorizacion")
                await new Promise((resuelve ) => setTimeout(resuelve,2000))
                let suma=0
                notas.forEach(nota=>{suma+=nota})
                suma=suma /notas.length
                
                let objeto={
                    ideli:Date.now(),
                    id:id,
                    nom:nom,
                    nota:notas,
                    def:suma
                }

                array=[...array,objeto]

                return {jugador:suma}
            }catch(error){
                console.error(error)
                return {jugador:0}
            }
           
        }

        const boton = async (nota1,nota2,nota3,id,nom)=>{

            try{
                const permitido= await getdata()

                if( permitido){
                    const user= await showdata([nota1,nota2,nota3],id,nom)
                    settext(user.jugador)
                }
            } catch(error){
                console.log(error)
            }
            
    }   