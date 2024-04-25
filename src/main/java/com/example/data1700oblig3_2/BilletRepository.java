package com.example.data1700oblig3_2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class BilletRepository {
    @Autowired
    private JdbcTemplate db;

    public void PostBillett(Billett innBillett) {
        String sql = "INSERT INTO billett (film, antall, fornavn, etternavn, telefonNr, epost) VALUES(?,?,?,?,?,?)";
        db.update(sql, innBillett.getFilm(), innBillett.getAntall(), innBillett.getFornavn(), innBillett.getEtternavn(), innBillett.getTelefonNr(), innBillett.getEpost());
    }
    public List<Billett> GetBilletter() {
        String sql = "SELECT * FROM billett";
        List<Billett> alleBilletter = db.query(sql,new BeanPropertyRowMapper(Billett.class));
        return alleBilletter;
    }

    public void DeleteBilletter() {
        String sql = "DELETE FROM billett";
        db.update(sql);
    }

    public void DeleteBillett(Integer InputID) {
        if (InputID == null) {
            System.out.println("InputID is null. Cannot delete.");
            return;
        }

        String sql = "DELETE FROM billett WHERE uid = ?";
        System.out.println("Executing SQL query: " + sql);

        int rowsAffected = db.update(sql, InputID);
        System.out.println("Rows affected: " + rowsAffected);
    }

    public void UpdateBillett(Billett innBillett) {
        String sql = "UPDATE billett SET film=?, antall=?, fornavn=?, etternavn=?, telefonNr=?, epost=? WHERE uid=?";
        db.update(sql, innBillett.getFilm(), innBillett.getAntall(), innBillett.getFornavn(), innBillett.getEtternavn(), innBillett.getTelefonNr(), innBillett.getEpost(), innBillett.getUid());
    }

}
