<?php

//Kaos Kaki
function hitung($kaoskaki) {
    $totalKK = [];

    foreach ($kaoskaki as $kaosKK) {
        if (isset($totalKK[$kaosKK])) {
            $totalKK[$kaosKK]++;
        } else {
            $totalKK[$kaosKK] = 1;
        }
    }

   
    $totalPasang = 0;
    foreach ($totalKK as $total) {
        $totalPasang += intdiv($total, 2);  
    }

    return $totalPasang;
}

$kaoskaki = [5, 7, 7, 9, 10, 4, 5, 10, 6, 5];


echo hitung($kaoskaki);