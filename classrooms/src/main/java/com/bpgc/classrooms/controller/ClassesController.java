package com.bpgc.classrooms.controller;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.io.BufferedReader;
import java.io.InputStreamReader;

@RestController
//@RequestMapping(value = "/home")
public class ClassesController {
    @GetMapping("/exec")
    public ResponseEntity<Resource> executePythonScript() {
        try {
            // Path to your Python script
            String pythonScriptPath = "C:\\Users\\HP\\AppData\\Local\\Microsoft\\WindowsApps\\python.exe C:\\Users\\HP\\Desktop\\Projects\\classes\\classrooms\\src\\main\\java\\scripts\\classesempty.py";

            // Execute Python script
            Process process = Runtime.getRuntime().exec("C:\\Users\\HP\\Desktop\\Projects\\classes\\classrooms\\src\\main\\java\\scripts\\classesempty.py " + pythonScriptPath);

            // Wait for the process to finish
            int exitCode = process.waitFor();

            if (exitCode == 0) {
                // Provide the path to the generated JSON file
                Path jsonFilePath = Paths.get("output.json");

                // Serve the JSON file as a resource
                Resource resource = new UrlResource(jsonFilePath.toUri());

                return ResponseEntity.ok()
                        .header("Content-Disposition", "attachment; filename=output.json")
                        .body(resource);
            } else {
                return ResponseEntity.badRequest().body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }
}


