package org.demo.api;

import org.demo.model.Item;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/item")
public class ItemResource {

    private Map<String, Item> map = new ConcurrentHashMap<>();


    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<JsonResponse> getItem(@PathVariable String id) {
        Item item = map.get(id);

        if (item == null) {
            JsonResponse jsonResponse = new JsonResponse();
            jsonResponse.setStatus(ResponseStatus.Failure);
            jsonResponse.setContent("No resource with id: " + id);
            return new ResponseEntity<>(jsonResponse, HttpStatus.NOT_FOUND);
        }

        JsonResponse jsonResponse = new JsonResponse();
        jsonResponse.setStatus(ResponseStatus.Success);
        jsonResponse.setContent(item);

        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }

    @RequestMapping(value = "")
    public ResponseEntity<JsonResponse> getAllItems() {
        JsonResponse jsonResponse = new JsonResponse();
        jsonResponse.setStatus(ResponseStatus.Success);
        jsonResponse.setContent(map.values());

        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<JsonResponse> createItem(@RequestBody Item item) {
        item.setId(UUID.randomUUID().toString());
        map.put(item.getId(), item);

        JsonResponse jsonResponse = new JsonResponse();
        jsonResponse.setStatus(ResponseStatus.Success);
        jsonResponse.setContent(item);

        return new ResponseEntity<>(jsonResponse, HttpStatus.CREATED);
    }

}
