/* LEGACY AI ENCRYPTION UTILITIES */
/* Atlas Technical Director - February 28, 2026 */

import * as crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const KEY_LENGTH = 32
const IV_LENGTH = 16
const TAG_LENGTH = 16

// Generate encryption key from user data (deterministic)
export function getUserEncryptionKey(userId: string, email: string): Buffer {
  const salt = Buffer.from(userId, 'hex')
  return crypto.pbkdf2Sync(email.toLowerCase(), salt, 100000, KEY_LENGTH, 'sha256')
}

// Encrypt data (returns base64 string)
export function encrypt(data: any, key: Buffer): string {
  try {
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = (crypto as any).createCipherGCM(ALGORITHM, key, iv)
    
    const jsonString = JSON.stringify(data)
    let encrypted = cipher.update(jsonString, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    
    const tag = cipher.getAuthTag()
    
    // Combine iv + tag + encrypted data
    const combined = Buffer.concat([
      iv,
      tag,
      Buffer.from(encrypted, 'hex')
    ])
    
    return combined.toString('base64')
  } catch (error) {
    console.error('Encryption error:', error)
    throw new Error('Failed to encrypt data')
  }
}

// Decrypt data (from base64 string)
export function decrypt(encryptedData: string, key: Buffer): any {
  try {
    const combined = Buffer.from(encryptedData, 'base64')
    
    // Extract components
    const iv = combined.subarray(0, IV_LENGTH)
    const tag = combined.subarray(IV_LENGTH, IV_LENGTH + TAG_LENGTH)
    const encrypted = combined.subarray(IV_LENGTH + TAG_LENGTH)
    
    const decipher = (crypto as any).createDecipherGCM(ALGORITHM, key, iv)
    decipher.setAuthTag(tag)
    
    let decrypted = decipher.update(encrypted, undefined, 'utf8')
    decrypted += decipher.final('utf8')
    
    return JSON.parse(decrypted)
  } catch (error) {
    console.error('Decryption error:', error)
    throw new Error('Failed to decrypt data')
  }
}

// Encrypt Soul File for storage
export function encryptSoulFile(soulFile: any, userId: string, email: string): string {
  const key = getUserEncryptionKey(userId, email)
  return encrypt(soulFile, key)
}

// Decrypt Soul File from storage
export function decryptSoulFile(encryptedSoulFile: string, userId: string, email: string): any {
  const key = getUserEncryptionKey(userId, email)
  return decrypt(encryptedSoulFile, key)
}

// Encrypt conversation messages
export function encryptMessages(messages: any[], userId: string, email: string): string {
  const key = getUserEncryptionKey(userId, email)
  return encrypt(messages, key)
}

// Decrypt conversation messages
export function decryptMessages(encryptedMessages: string, userId: string, email: string): any[] {
  const key = getUserEncryptionKey(userId, email)
  return decrypt(encryptedMessages, key)
}

// Generate secure random token
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex')
}

// Hash password (for comparison)
export function hashData(data: string, salt?: string): string {
  const actualSalt = salt || crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(data, actualSalt, 100000, 64, 'sha256')
  return `${actualSalt}:${hash.toString('hex')}`
}

// Verify hashed data
export function verifyHashedData(data: string, hashedData: string): boolean {
  const [salt, hash] = hashedData.split(':')
  const hashedInput = hashData(data, salt)
  return hashedInput === hashedData
}