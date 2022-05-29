let numero,factorial = 1,i;
numero = parseInt(prompt("Ingrese un numero y calcule su factorial!"));
i=numero;
while(i != 0){
    factorial*=i--;
}
alert("El factorial de " + numero + " es: " + factorial);