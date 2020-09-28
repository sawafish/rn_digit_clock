#!/bin/bash

### Android打包脚本 ###
# 开始时间
STARTTIME=$(date '+%s')

# 开始打包
APP_HOME="`pwd -P`"
./gradlew assembleRelease

if [ $? != 0 ]; then
    echo '打包失败'
    ENDTIME=$(date '+%s')
    MINSECONDS=$(($ENDTIME-$STARTTIME))
    echo "本次打包耗时:${MINSECONDS}s"
    exit 1
fi

######   ------------------------ 读取当前项目的版本号 ---------------------------　######

# 更新文件的URL
UPDATE_URL=$(cat ../package.json | jq '.updateurl')
UPDATE_URL=$(echo $UPDATE_URL| sed $'s/\"//g')

# 读取版本号
VERSION=$(cat ../package.json | jq '.version')

# 去除引号
VERSION=$(echo $VERSION| sed $'s/\"//g')

# 版本号字符串拆分 得到主版本号
array=(${VERSION//\./ })
MAJOR=${array[0]}

# 获取当前日期并格式化
CURR_DATE=$(date +_%Y-%m-%d)

###### -----------查找打包的APK文件对文件进行MD5等信息提取----------- ######

# 查找app　完整的APK名称 $PROJECT_NAME-$VERSION_$CURR_DATE.APK   M2600-1.0.6_2020-03-20.apk
APP_NAME=$(find ./app/build/outputs/apk/release/*$VERSION$CURR_DATE.apk -ctime -1)

# 文件做MD5校验
MD5=$(md5sum $APP_NAME | cut -d ' ' -f1)

## apk大小ApkSize Kb
APK_SIZE=$(ls -l $APP_NAME | awk '{print $5}')

# 计算APK的大小
APK_SIZE=$(($APK_SIZE/1024))

# 去除目录的路径
APP_NAME=${APP_NAME##*/}

UPDATE_LOG="1.新版本"

######   ---------------------  构建新版本的升级信息 -------------------------- ######

# 构建verson.json　新版本的说明信息
if [ $APP_NAME ]; then
    echo $APP_NAME
    JSON="{\"code\": 0, \"msg\": \"\",\"versionName\": \"$VERSION\",\"filename\": \"$APP_NAME\",\"downLoadUrl\": \"$UPDATE_URL$APP_NAME\",\"desc\":[], \"updateStatus\": 1,\"modifyContent\":\"$UPDATE_LOG\",\"apkMd5\":\"$MD5\", \"apkSize\": $APK_SIZE, \"versionCode\": $MAJOR}"
    echo $JSON
    echo  $JSON >  ./app/build/outputs/apk/release/version.json
fi


# 结束时间
ENDTIME=$(date '+%s')
MINSECONDS=$(($ENDTIME-$STARTTIME))
echo "本次打包耗时:${MINSECONDS}s"
