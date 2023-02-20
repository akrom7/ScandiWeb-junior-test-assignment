<?php
$parol = "sqlkod";
$table = "";
$dbb = mysqli_connect("localhost", "xsshuz_db", "$parol", "$table");


if ($dbb) {
//echo "Ulangan";
} else {
    echo "Xatolik  :" . mysqli_error($dbb);
}

$data = [];
$data['ok'] = false;


$request = file_get_contents("php://input");
$qabuli = json_decode($request, true);


if (isset($qabuli['create']) and isset($qabuli['type']) and isset($qabuli['name']) and isset($qabuli['id'])) {
    $id = $qabuli['id'];
    $name = urlencode($qabuli['name']);
    $price = $qabuli['price'];
    $type = $qabuli['type'];

    if ($type == 0) {
        $size = $qabuli['size'];
        $shart = "INSERT INTO task(id,name,type,price,size) VALUES ('$id','$name','$type',$price,$size)";
    } elseif ($type == 1) {
        $weight = $qabuli['weight'];
        $shart = "INSERT INTO task(id,name,type,price,weight) VALUES ('$id','$name','$type',$price,$weight)";
    } elseif ($type == 2) {
        $width = $qabuli['width'];
        $height = $qabuli['height'];
        $length = $qabuli['length'];
        $shart = "INSERT INTO task(id,name,type,price,width,height,length) VALUES ('$id','$name','$type',$price,$width,$height,$length)";
    }

    if (mysqli_query($dbb, $shart)) {
        $data['ok'] = true;
        $data['about'] = "create";
        $data['code'] = 200;
    } else {
        $data['about'] = mysqli_error($dbb);
        $data['code'] = 500;
    }


} elseif (isset($qabuli['product'])) {

    if ($sql = mysqli_query($dbb, "SELECT * FROM task WHERE 1")) {
        if (mysqli_num_rows($sql) > 0) {

            $result = [];
            while ($in = mysqli_fetch_assoc($sql)) {
                array_push($result, $in);
            }
            $data['ok'] = true;
            $data['result'] = $result;

        } else {
            $data['about'] = "No found product";
            $data['code'] = 404;
        }
    }


} elseif (isset($qabuli['del']) and isset($qabuli['id'])) {
    $id = $qabuli['id'];

    $idlar = explode(',', $id);

    foreach ($idlar as $idd) {
        $sql = mysqli_query($dbb, "SELECT * FROM task WHERE id='$idd'");
        if (mysqli_num_rows($sql) > 0) {
            mysqli_query($dbb, "DELETE FROM `task` WHERE `task`.`id` = '$idd'");
        }
    }
    $data['ok'] = true;
    $data['about'] = "delete";
} else {
    $data['about'] = "error";
    $data['code'] = 404;
}


echo json_encode($data);


?>
