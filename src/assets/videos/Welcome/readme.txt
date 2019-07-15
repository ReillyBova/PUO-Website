ffmpeg -y -i test.mov -c:v libx264 -preset medium -b:v 960k -pass 1 -an -f mp4 /dev/null && ffmpeg -i test.mov -c:v libx264 -preset medium -b:v 960k -pass 2 -an large.mp4

ffmpeg -y -i test.mov -c:v libx264 -preset medium -b:v 736k -pass 1 -an -f mp4 /dev/null && ffmpeg -i test.mov -c:v libx264 -preset medium -b:v 736k -pass 2 -an medium.mp4

ffmpeg -y -i test.mov -c:v libx264 -preset medium -b:v 512k -s 1280x720 -pass 1 -an -f mp4 /dev/null && ffmpeg -i test.mov -c:v libx264 -preset medium -b:v 512k -s 1280x720 -pass 2 -an small.mp4

ffmpeg -y -i test.mov -c:v libx264 -preset medium -b:v 256k -s 896x504 -pass 1 -an -f mp4 /dev/null && ffmpeg -i test.mov -c:v libx264 -preset medium -b:v 256k -s 896x504 -pass 2 -an tiny.mp4
