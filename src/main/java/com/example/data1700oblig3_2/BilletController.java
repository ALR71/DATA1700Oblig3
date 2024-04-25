package com.example.data1700oblig3_2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BilletController {
    @Autowired
    BilletRepository repository;

        @GetMapping("/GetBilletter")
        public List<Billett> getBilleter() {
            return repository.GetBilletter();
        }

        @PostMapping("/PostBillett")
        public void postBillett(Billett billett) {

            repository.PostBillett(billett);
        }
        @PostMapping("/UpdateBillett")
        public void updateBillett(Billett billett) {

            repository.UpdateBillett(billett);
        }

        @PostMapping("/DeleteBilletter")
        public void deleteBilletter() {

            repository.DeleteBilletter();
     }

        @PostMapping("/DeleteBillett")
        public void deleteBillett(Integer id) {

            repository.DeleteBillett(id);
        }
}
