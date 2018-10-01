# Ordo Photos

Collect photos.

## Milestones

- [ ] Timeline
- [ ] Preview Mode
- [ ] Synchronization
- [ ] Filtering
- [ ] Ordering
- [ ] Tags
- [ ] Memories
- [ ] People
- [ ] Places

## Components

### Native App (Electron)
- Scroll through a timeline of photos.
- Preview photo with metadata.
- Sync photos in specified folders to server.
- Configure settings.

### API (Node)
- Serve artifacts with support for filtering, ordering, and pagination.
- Coordinate synchronization between client and file store.

### Processing / Jobs (Node/Python)
- Job scheduler
- Metadata extraction
- Image re-sizing
- Color extraction
- Face recognition
- System sanitizer

### Support Functions

Store artifacts - Database (MongoDB)

Store photos - File Store (Minio)

Job management - Pub/Sub (Kafka)
