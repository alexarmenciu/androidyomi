package com.wordgrabber;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.mlkit.common.model.DownloadConditions;
import com.google.mlkit.nl.translate.TranslateLanguage;
import com.google.mlkit.nl.translate.Translation;
import com.google.mlkit.nl.translate.Translator;
import com.google.mlkit.nl.translate.TranslatorOptions;

public class TranslationModule extends ReactContextBaseJavaModule {
    TranslationModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "TranslationModule";
    }

    @ReactMethod
    public void getTranslation(String text, Promise promise){

        TranslatorOptions options =
                new TranslatorOptions.Builder()
                        .setSourceLanguage(TranslateLanguage.JAPANESE)
                        .setTargetLanguage(TranslateLanguage.ENGLISH)
                        .build();
        final Translator englishJapaneseTranslator =
                Translation.getClient(options);


        DownloadConditions conditions = new DownloadConditions.Builder().requireWifi().build();
        englishJapaneseTranslator.downloadModelIfNeeded(conditions)
                .addOnSuccessListener(
                        new OnSuccessListener<Void>() {
                            @Override
                            public void onSuccess(Void v) {
                                Log.i("strtotranslateis:", text);
                                englishJapaneseTranslator.translate(text)
                                        .addOnSuccessListener(
                                                result-> {Log.i("resultis:", result); promise.resolve(result);})
                                        .addOnFailureListener(
                                                exception -> {Log.i("raisedexception:", exception.toString()); return;});
                            }
                        })
                .addOnFailureListener(
                        new OnFailureListener() {
                            @Override
                            public void onFailure(@NonNull Exception e) {
                                Log.i("modelwasntdownloaded:", "false");
                                promise.reject("couldn't download translation model");
                                return;
                            }
                        });
        return;
    }
}
