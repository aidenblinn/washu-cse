<?php
    $operation = $_GET["operation"];
    $one = $_GET["1"];
    $two = $_GET["2"];
    
    if ($operation == "add") {
        $result = $one + $two;
    }

    else if ($operation == "subtract") {
        $result = $one - $two;
    }

    else if ($operation == "multiiply") {
        $result = $one * $two;
    }

    else if ($operation == "divide") {
        if ($two == 0) {
            echo "thou shalt not divide by 0";
        }
        else {
            $result = $one / $two;
        }
    } 

    else {
        echo "remember to choose an operation";
    }
?>
<style>
    html * {
        font-family: 'Courier New', Courier, monospace;
    }
    div {
        margin:auto;
        width:50%;
        padding-top:5%;
    }
    p {
        color: #0e20c2;
    }
</style>
<div>
    <p style=>result: <?php echo $result; ?></p>
</div>
<div>
    <form action="calculator.html">
        <label for="return">
            <input type="submit"; value="back to calculator"; id="return">
        </label>
    </form>
</div>