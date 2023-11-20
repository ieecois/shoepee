package com.ToDoiVar.ShoesPee.Services;

import com.ToDoiVar.ShoesPee.Models.CustomizedShoe;
import com.ToDoiVar.ShoesPee.dto.CustomizedShoeDto;

import java.util.List;

public interface CustomizedShoeService {
    List<CustomizedShoeDto> getAllShoe();
    CustomizedShoeDto getShoeById(int id);
    CustomizedShoe findById(int id);
    CustomizedShoe addShoe(CustomizedShoeDto newShoe, int shoeModelsId);
    CustomizedShoeDto editShoe(int id, CustomizedShoeDto editShoe);
    List<CustomizedShoeDto> getShoeByShoeModel(int shoeModelId);
    CustomizedShoe deleteShoe(int id);
}
