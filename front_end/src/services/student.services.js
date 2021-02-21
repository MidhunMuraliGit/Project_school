import http from "../http-common"
class  StudentDataService {
    getAll() {
        return http.get("/students"); 
      }
    
     
      create(data) {
        return http.post("/students", data);
      }
    
      
      delete(id) {
        return http.delete(`/students/${id}`);
      }
    
    
}
 
export default new StudentDataService();