import http from '@/http-common';

class DataService {
    getAll(user: string, repo: string): Promise<any> {
        return http.get(`/pullRequests/${user}/${repo}`);
    }

    get(url: string | any): Promise<any> {
        return http.get(`/commits?url=${url}`);
    }
}

export default new DataService();