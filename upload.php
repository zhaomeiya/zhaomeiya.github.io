<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $target_dir = "images/";  // 使用images文件夹存储图片
    
    // 根据上传类型选择子文件夹
    $image_type = isset($_POST["type"]) ? $_POST["type"] : "gallery";
    switch($image_type) {
        case "profile":
            $target_dir .= "profile/";
            break;
        case "gallery":
            $target_dir .= "gallery/";
            break;
        case "school":
            $target_dir .= "school/";
            break;
        case "interests":
            $target_dir .= "interests/";
            break;
    }
    
    // 如果目录不存在则创建
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    
    $response = array();
    
    // 处理上传的文件
    if (isset($_FILES["image"])) {
        $file = $_FILES["image"];
        $fileName = basename($file["name"]);
        $targetFilePath = $target_dir . $fileName;
        $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);
        
        // 允许的文件格式
        $allowTypes = array('jpg', 'jpeg', 'png', 'gif');
        
        if (in_array(strtolower($fileType), $allowTypes)) {
            // 上传文件
            if (move_uploaded_file($file["tmp_name"], $targetFilePath)) {
                $response["status"] = "success";
                $response["message"] = "图片上传成功";
                $response["path"] = $targetFilePath;
            } else {
                $response["status"] = "error";
                $response["message"] = "抱歉，上传文件时出错";
            }
        } else {
            $response["status"] = "error";
            $response["message"] = "抱歉，只允许上传JPG, JPEG, PNG & GIF格式的图片";
        }
    }
    
    // 返回JSON响应
    header('Content-Type: application/json');
    echo json_encode($response);
}
?> 