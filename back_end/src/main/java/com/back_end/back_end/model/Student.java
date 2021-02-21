package com.back_end.back_end.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "students")
public class Student {
    @Id
   private String id;
  
   private String rollno;
   private String name;
   private String dob;
   private String sclass;
   private String division;
   private String gender;

   public Student()
   {

   }

   public Student(String rollno,String name,String dob,String sclass,String division,String gender)
   {
        this.rollno=rollno;
        this.name=name;
        this.dob=dob;
        this.sclass=sclass;
        this.division=division;
        this.gender=gender;
   }
   
   public String getId()
   {
       return id;
   }


  public String getRollno()
  {
      return rollno;
  }
  public void setRollno(String rollno)
  {
      this.rollno=rollno;
  }


    public String getName()
    {
        return name;
    }
    public void SetName(String name)
    {
        this.name=name;
    }



    public String getDob()
    {
        return dob;
    }
    public void SetDob(String dob)
    {
        this.dob=dob;
    }



   public String getSclass()
   {
      return sclass;
   }
   public void SetSclass(String sclass)
   {
       this.sclass=sclass;
   }


   public String getDivision()
   {
       return division;
   }

   public void setDivision(String division)
   {
       this.division=division;
   }




   public String getGender()
   {
       return gender;
   }

   public void setGender(String gender)
   {
       this.gender=gender;
   }
   @Override
   public String toString() {
     return "Student [id=" + id + ",rollno="+rollno+",name=" + name + ", dob=" + dob + ", sclass=" + sclass + ", division=" +division+", gender="+gender+"]";
   }

}
