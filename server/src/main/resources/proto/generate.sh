#!/usr/bin/env bash
# Regenerate protobuf Java classes from .proto files.
# Run from server/src/main/resources/proto/ directory.
protoc -I=. --java_out=../../../java/ ./*.proto
