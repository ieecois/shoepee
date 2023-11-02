package com.ToDoiVar.ShoesPee.Controller.RoleAdminController;

import com.ToDoiVar.ShoesPee.Models.Brand;
import com.ToDoiVar.ShoesPee.Services.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/admin")

public class BrandManageController {
    @Autowired
    private BrandService brandService;
    @GetMapping("/brands")
    public ResponseEntity<List<Brand>> getAllBrand(){
        return new ResponseEntity<>(brandService.getAllBrand(), HttpStatus.OK);
    }
    @GetMapping("/getbrandbyid/{id}")
    public ResponseEntity<Brand> getBrandById(@PathVariable int id){
        return new ResponseEntity<>(brandService.getBrandById(id),HttpStatus.OK);
    }
    @GetMapping("/getbrandbyname/{name}")
    public ResponseEntity<Brand> getBrandByName(@PathVariable String name){
        return new ResponseEntity<>(brandService.getBrandByName(name),HttpStatus.OK);
    }
    @PostMapping("/addbrand")
    public ResponseEntity<Brand> addBrand(@RequestBody Brand newBrand){
        return new ResponseEntity<>(brandService.addBrand(newBrand),HttpStatus.OK);
    }
    @PutMapping("/editbrand/{id}")
    public ResponseEntity<Brand> editBrand(@PathVariable int id,@RequestBody Brand editBrand){
        return new ResponseEntity<>(brandService.editBrand(id,editBrand),HttpStatus.OK);
    }
    @DeleteMapping("/deletebrand/{id}")
    public ResponseEntity<String> deleteBrand(@PathVariable int id){
        brandService.deleteBrand(id);
        return new ResponseEntity<String>("Delete Sucessful",HttpStatus.OK);
    }
}
