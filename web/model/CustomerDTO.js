function CustomerDTO(id, name, tp, salary) {
    var id=id;
    var name=name;
    var tp=tp;
    var salary=salary;

    this.setId=function (cusId){
        id=cusId;
    }

    this.getId=function (){
        return id;
    }
    this.setName=function (cusName){
        name=cusName;
    }
    this.getName=function (){
        return name;
    }

    this.setTp=function(cusTp){
        tp=cusTp;
    }

    this.getTp=function (){
        return tp;
    }

    this.setSalary=function (cusSalary){
        tp=cusSalary;
    }

    this.getSalary=function (){
        return salary
    }
}