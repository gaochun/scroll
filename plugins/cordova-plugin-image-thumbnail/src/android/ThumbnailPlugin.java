package org.gaochun.plugins;

import android.app.ProgressDialog;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.ThumbnailUtils;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.util.Base64;

import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;

/**
 * This class echoes a string called from JavaScript.
 */
public class ThumbnailPlugin extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("thumbnail")) {
            String message = args.getString(0);
            this.thumbnail(message, callbackContext);
            return true;
        }
        return false;
    }

    private void thumbnail(final String path, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                if (path == null || path.length() == 0) {
                    callbackContext.error(path + " is invalid path.");
                    return;
                }
                int width = 200;
                int height = 200;
                Bitmap bitmap = null;
                BitmapFactory.Options options = null;
                try {
                    options = new BitmapFactory.Options();
                } catch (Exception exception) {
                    callbackContext.error("Load " + path + " failed.");
                    return;
                }
                options.inJustDecodeBounds = true;
                // 获取这个图片的宽和高，注意此处的bitmap为null
                bitmap = BitmapFactory.decodeFile(path, options);
                options.inJustDecodeBounds = false; // 设为 false
                // 计算缩放比
                int h = options.outHeight;
                int w = options.outWidth;
                int beWidth = w / width;
                int beHeight = h / height;
                int be = 1;
                if (beWidth < beHeight) {
                    be = beWidth;
                } else {
                    be = beHeight;
                }
                if (be <= 0) {
                    be = 1;
                }
                options.inSampleSize = be;
                // 重新读入图片，读取缩放后的bitmap，注意这次要把options.inJustDecodeBounds 设为 false
                bitmap = BitmapFactory.decodeFile(path, options);
                // 利用ThumbnailUtils来创建缩略图，这里要指定要缩放哪个Bitmap对象
                bitmap = ThumbnailUtils.extractThumbnail(bitmap, width, height,
                        ThumbnailUtils.OPTIONS_RECYCLE_INPUT);

                ByteArrayOutputStream bStream = new ByteArrayOutputStream();
                bitmap.compress(Bitmap.CompressFormat.PNG, 5, bStream);
                byte[] bytes = bStream.toByteArray();
                String result = Base64.encodeToString(bytes, Base64.DEFAULT);

                callbackContext.success(result);
            }
        });
    }
}
