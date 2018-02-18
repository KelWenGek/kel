#!/bin/bash
echo "Start the test script"
echo "Script Process ID: $$"
count=1
while [ $count -le 5 ]
do
    echo "Loop #$count"
    sleep 10
    count=$[ $count + 1 ]

done 
echo "The script is complete"
