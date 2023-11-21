const $input = document.getElementById("input");
const $output = document.getElementById("output");

console.log($input, $output)
$input.addEventListener('input', updateValue);

function updateValue(e) {
    let text = e.target.value;

    if(text.includes("/table")) {
        text = text.replace("/table", "<hello>"); 
    }

    console.log(text)
    $input.textContent = text;

}

console.log("this is popup")