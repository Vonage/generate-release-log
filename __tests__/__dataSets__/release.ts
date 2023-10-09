export default [
  {
    label: 'correctly dumps standard release',
    pkgName: 'My SDK',
    lines: `## Vonage My SDK v1.0.0 (1997-08-29)

### Changed
* Planks constant to a lower value

### Deprecated
* Call to kernal

### Fixes 
* Ctrl Key no longer overheats CPU

### Removed
* The need for speed

### Added
* New feature to reticulate splines

### Security
* Key Card now requrired for entry


`.split('\n'),
    expected: `## Vonage My SDK v1.0.0 (1997-08-29)

### Added

* New feature to reticulate splines

### Fixed

* Ctrl Key no longer overheats CPU

### Security

* Key Card now requrired for entry

### Removed

* The need for speed

### Changed

* Planks constant to a lower value

### Deprecated

* Call to kernal`,
  }

];
